import asyncio
import sys
import unittest
from types import SimpleNamespace

from collector import read_music, text, use_utf8_output, validate_endpoint
from winrt.windows.media.control import GlobalSystemMediaTransportControlsSessionPlaybackStatus as Playback


class Session:
    def __init__(self, app, title, status):
        self.source_app_user_model_id = app
        self.title = title
        self.status = status

    def get_playback_info(self):
        return SimpleNamespace(playback_status=self.status)

    async def try_get_media_properties_async(self):
        return SimpleNamespace(title=self.title, artist="Artist")


class CollectorTests(unittest.TestCase):
    def test_only_netease_and_playing_session_takes_priority(self):
        manager = SimpleNamespace(get_sessions=lambda: [
            Session("Spotify.exe", "Other music", Playback.PLAYING),
            Session("cloudmusic.exe", "Paused song", Playback.PAUSED),
            Session("cloudmusic.exe", "Playing song", Playback.PLAYING),
        ])
        result = asyncio.run(read_music(manager))
        self.assertEqual(result["title"], "Playing song")
        self.assertTrue(result["playing"])

    def test_pause_is_not_reported_as_playing_and_stop_clears_music(self):
        session = Session("cloudmusic.exe", "Song", Playback.PAUSED)
        manager = SimpleNamespace(get_sessions=lambda: [session])
        self.assertFalse(asyncio.run(read_music(manager))["playing"])
        session.status = Playback.STOPPED
        self.assertIsNone(asyncio.run(read_music(manager)))

    def test_no_supported_session_returns_no_music(self):
        manager = SimpleNamespace(get_sessions=lambda: [Session("browser.exe", "Video", Playback.PLAYING)])
        self.assertIsNone(asyncio.run(read_music(manager)))

    def test_endpoint_does_not_send_secret_over_public_http_or_url_credentials(self):
        for url in ["https://example.com/status", "http://127.0.0.1:8789/status"]:
            validate_endpoint(url)
        for url in ["http://example.com/status", "https://user:pass@example.com/status", "https://example.com/status?token=secret", "https://example.com/redirect", "file:///status"]:
            with self.assertRaises(ValueError):
                validate_endpoint(url)

    def test_redirected_output_is_forced_to_utf8(self):
        # Redirected stdout uses the ANSI code page (gbk here); an unencodable
        # song title would otherwise abort --dry-run with UnicodeEncodeError.
        use_utf8_output()
        if not hasattr(sys.stdout, "reconfigure"):
            self.skipTest("stdout cannot be reconfigured by this runner")
        self.assertEqual((sys.stdout.encoding or "").lower().replace("-", ""), "utf8")

    def test_text_strips_control_characters_and_enforces_the_limit(self):
        self.assertEqual(text("Bad\u0000\u001fName\u007f", 200), "BadName")
        self.assertEqual(text("Line\nBreak", 200), "LineBreak")
        self.assertEqual(text("x" * 500, 200), "x" * 200)
        self.assertEqual(text(None, 200), "")


if __name__ == "__main__":
    unittest.main()
