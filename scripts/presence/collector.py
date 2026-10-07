"""Windows foreground activity + NetEase SMTC. No window titles or file paths leave this process."""
import argparse
import asyncio
import ctypes
from ctypes import wintypes
import json
import os
from pathlib import Path
import sys
import time
import urllib.error
import urllib.parse
import urllib.request


class LastInput(ctypes.Structure):
    _fields_ = [("cbSize", wintypes.UINT), ("dwTime", wintypes.DWORD)]


def acquire_instance():
    """A per-session mutex also prevents simultaneous manual/login launches."""
    kernel = ctypes.WinDLL("kernel32", use_last_error=True)
    kernel.CreateMutexW.argtypes = [ctypes.c_void_p, wintypes.BOOL, wintypes.LPCWSTR]
    kernel.CreateMutexW.restype = wintypes.HANDLE
    kernel.CloseHandle.argtypes = [wintypes.HANDLE]
    handle = kernel.CreateMutexW(None, False, "Local\\FireflyPresenceCollector")
    if not handle:
        raise ctypes.WinError(ctypes.get_last_error())
    if ctypes.get_last_error() == 183:
        kernel.CloseHandle(handle)
        return None
    return handle  # Windows releases this handle when the process exits.


class WindowsActivity:
    def __init__(self):
        self.user = ctypes.WinDLL("user32", use_last_error=True)
        self.kernel = ctypes.WinDLL("kernel32", use_last_error=True)
        self.user.GetForegroundWindow.restype = wintypes.HWND
        self.user.GetWindowThreadProcessId.argtypes = [wintypes.HWND, ctypes.POINTER(wintypes.DWORD)]
        self.user.GetLastInputInfo.argtypes = [ctypes.POINTER(LastInput)]
        self.kernel.OpenProcess.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
        self.kernel.OpenProcess.restype = wintypes.HANDLE
        self.kernel.QueryFullProcessImageNameW.argtypes = [wintypes.HANDLE, wintypes.DWORD, wintypes.LPWSTR, ctypes.POINTER(wintypes.DWORD)]
        self.kernel.CloseHandle.argtypes = [wintypes.HANDLE]
        self.kernel.GetTickCount.restype = wintypes.DWORD
        self.user.OpenInputDesktop.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
        self.user.OpenInputDesktop.restype = wintypes.HANDLE
        self.user.SwitchDesktop.argtypes = [wintypes.HANDLE]
        self.user.CloseDesktop.argtypes = [wintypes.HANDLE]

    def read(self, apps, idle_seconds):
        # SwitchDesktop only tests accessibility of the current input desktop;
        # this never switches to a different desktop or unlocks the workstation.
        desktop = self.user.OpenInputDesktop(0, False, 0x0100)
        if not desktop:
            return "away", None
        try:
            if not self.user.SwitchDesktop(desktop):
                return "away", None
        finally:
            self.user.CloseDesktop(desktop)
        last = LastInput(ctypes.sizeof(LastInput), 0)
        if not self.user.GetLastInputInfo(ctypes.byref(last)):
            return "away", None
        idle = ((self.kernel.GetTickCount() - last.dwTime) & 0xFFFFFFFF) / 1000
        if idle >= idle_seconds:
            return "away", None
        hwnd = self.user.GetForegroundWindow()
        pid = wintypes.DWORD()
        self.user.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        handle = self.kernel.OpenProcess(0x1000, False, pid.value)
        executable = ""
        if handle:
            try:
                buf = ctypes.create_unicode_buffer(32768)
                size = wintypes.DWORD(len(buf))
                if self.kernel.QueryFullProcessImageNameW(handle, 0, buf, ctypes.byref(size)):
                    executable = Path(buf.value).name.lower()
            finally:
                self.kernel.CloseHandle(handle)
        return "online", apps.get(executable, "正在使用电脑")


def use_utf8_output():
    """Redirected stdout/stderr fall back to the ANSI code page on Windows.

    A song title that the code page cannot represent would otherwise raise
    UnicodeEncodeError and abort the whole run, so force UTF-8 and never fail
    on an unencodable character. Real consoles already default to UTF-8.
    """
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError, OSError):
            pass  # A redirected or detached stream may not support reconfiguring.


def text(value, limit):
    return "".join(c for c in (value or "") if ord(c) >= 32 and ord(c) != 127)[:limit].strip()


async def read_music(manager):
    from winrt.windows.media.control import GlobalSystemMediaTransportControlsSessionPlaybackStatus as Playback
    candidates = []
    for session in manager.get_sessions():
        app_id = session.source_app_user_model_id.lower()
        if not any(name in app_id for name in ("cloudmusic", "netease", "网易云")):
            continue
        playback = session.get_playback_info().playback_status
        if playback not in (Playback.PLAYING, Playback.PAUSED):
            continue
        media = await asyncio.wait_for(session.try_get_media_properties_async(), timeout=3)
        title = text(media.title, 200)
        if title:
            candidates.append({"title": title, "artist": text(media.artist, 200), "playing": playback == Playback.PLAYING})
    return next((m for m in candidates if m["playing"]), candidates[0] if candidates else None)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def publish(endpoint, token, payload):
    request = urllib.request.Request(endpoint, data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json", "User-Agent": "FireflyPresence/1.0", "Authorization": f"Bearer {token}"}, method="POST")
    with urllib.request.build_opener(NoRedirect()).open(request, timeout=8) as response:
        if response.status != 200:
            raise RuntimeError("Upload failed")


def validate_endpoint(endpoint):
    url = urllib.parse.urlsplit(endpoint)
    local = url.hostname in ("localhost", "127.0.0.1", "::1")
    if not url.hostname or (url.scheme != "https" and not (local and url.scheme == "http")):
        raise ValueError("Endpoint must use HTTPS (HTTP is allowed for localhost only)")
    if url.path != "/status" or url.query or url.fragment or url.username or url.password:
        raise ValueError("Endpoint must be a plain /status URL without credentials or query parameters")


async def run(args):
    from winrt.windows.media.control import GlobalSystemMediaTransportControlsSessionManager as Manager
    apps = json.loads(Path(args.apps).read_text(encoding="utf-8"))
    if not isinstance(apps, dict) or not all(isinstance(k, str) and isinstance(v, str) and 0 < len(v) <= 80 for k, v in apps.items()):
        raise ValueError("apps.json must map executable names to labels of 1-80 characters")
    apps = {k.lower(): v for k, v in apps.items()}
    activity = WindowsActivity()
    manager = None
    failures = 0
    endpoint = os.environ.get("PRESENCE_ENDPOINT", "")
    token = os.environ.get("PRESENCE_TOKEN", "")
    if not args.dry_run:
        validate_endpoint(endpoint)
        if len(token) < 32:
            raise ValueError("Set PRESENCE_TOKEN to the same secret as the Worker (at least 32 characters)")
    try:
        while True:
            state, label = activity.read(apps, args.idle_seconds)
            music = None
            try:
                if manager is None:
                    manager = await asyncio.wait_for(Manager.request_async(), timeout=5)
                music = await read_music(manager)
            except Exception as error:
                manager = None
                print(f"Media unavailable ({type(error).__name__}); activity reporting continues.", file=sys.stderr)
            payload = {"state": state, "activity": label, "music": music}
            if args.dry_run:
                print(json.dumps(payload, ensure_ascii=False), flush=True)
                if music is None:
                    print("No NetEase playing/paused SMTC session. Enable SMTC in NetEase Settings > System, then play a song.", file=sys.stderr)
            else:
                try:
                    await asyncio.to_thread(publish, endpoint, token, payload)
                    failures = 0
                    print(time.strftime("%H:%M:%S") + " Status sent", flush=True)
                except urllib.error.HTTPError as error:
                    if error.code in (401, 403, 404, 415, 503):
                        raise RuntimeError(f"Worker returned HTTP {error.code}; check endpoint and secret") from None
                    failures += 1
                    print(f"Upload failed (HTTP {error.code}); retrying.", file=sys.stderr)
                except Exception as error:
                    failures += 1
                    print(f"Upload failed ({type(error).__name__}); retrying.", file=sys.stderr)
            if args.once:
                break
            await asyncio.sleep(min(60, 15 * (2 ** min(failures, 2))))
    finally:
        if not args.dry_run and not args.once:
            try:
                await asyncio.to_thread(publish, endpoint, token, {"state": "offline"})
            except Exception:
                pass  # The Worker also expires status after 90 seconds.


if __name__ == "__main__":
    use_utf8_output()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Print local data only; never upload")
    parser.add_argument("--once", action="store_true", help="Take a single sample")
    parser.add_argument("--idle-seconds", type=int, default=300)
    parser.add_argument("--apps", default=str(Path(__file__).with_name("apps.json")))
    options = parser.parse_args()
    if sys.platform != "win32":
        parser.error("Windows is required")
    if options.idle_seconds < 30:
        parser.error("--idle-seconds must be at least 30")
    try:
        if not options.dry_run and not options.once:
            instance_handle = acquire_instance()
            if instance_handle is None:
                print("Collector already running.")
                sys.exit(0)
            saved_dir = Path(os.environ["LOCALAPPDATA"]) / "FireflyPresence"
            saved_dir.mkdir(parents=True, exist_ok=True)
            (saved_dir / "collector.pid").write_text(str(os.getpid()), encoding="ascii")
        asyncio.run(run(options))
    except KeyboardInterrupt:
        pass
    except Exception as error:
        print(f"Collector stopped: {error}", file=sys.stderr)
        sys.exit(1)
