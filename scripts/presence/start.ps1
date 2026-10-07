param([switch]$Background, [switch]$NonInteractive)
$ErrorActionPreference = "Stop"
$collectorPython = Join-Path $PSScriptRoot ".venv/Scripts/python.exe"
if (-not (Test-Path -LiteralPath $collectorPython)) {
    throw "Install first: python -m venv scripts/presence/.venv, then install requirements.txt with its python.exe"
}
$collectorScript = Join-Path $PSScriptRoot "collector.py"
$presenceSavedDir = Join-Path $env:LOCALAPPDATA "FireflyPresence"
$presenceSavedEndpoint = Join-Path $presenceSavedDir "endpoint.txt"
$presenceSavedToken = Join-Path $presenceSavedDir "token.xml"
$presencePidFile = Join-Path $presenceSavedDir "collector.pid"
# collector.py holds this session mutex for its whole lifetime. It is the only
# duplicate check that also sees a collector started from an elevated shell: a
# non-elevated process cannot read the command line of an elevated one.
$collectorMutexName = "Local\FireflyPresenceCollector"
# Best effort, used only to report which process is already running. CommandLine
# is unreadable for a process at a different elevation level, so never require it.
function Test-CollectorProcess($process) {
    if (-not $process -or $process.Name -notin @("python.exe", "pythonw.exe") -or -not $process.CommandLine) { return $false }
    return $process.CommandLine.IndexOf($collectorScript, [System.StringComparison]::OrdinalIgnoreCase) -ge 0
}
function Get-SavedCollectorPid {
    if (-not (Test-Path -LiteralPath $presencePidFile)) { return 0 }
    $savedPid = 0
    if (-not [int]::TryParse((Get-Content -LiteralPath $presencePidFile -Raw).Trim(), [ref]$savedPid)) { return 0 }
    $saved = Get-CimInstance Win32_Process -Filter "ProcessId = $savedPid" -ErrorAction SilentlyContinue
    if (-not $saved -or $saved.Name -notin @("python.exe", "pythonw.exe")) { return 0 }
    return $savedPid
}
function Get-RunningCollectorPid {
    $savedPid = Get-SavedCollectorPid
    if ($savedPid -gt 0) { return $savedPid }
    # A venv python.exe is a launcher that runs the real interpreter as a child;
    # prefer the child, which is the process holding the mutex.
    $presenceCandidates = @(Get-CimInstance Win32_Process -Filter "Name = 'python.exe' OR Name = 'pythonw.exe'" -ErrorAction SilentlyContinue | Where-Object { Test-CollectorProcess $_ })
    if ($presenceCandidates.Count -eq 0) { return 0 }
    $presenceExisting = $presenceCandidates | Where-Object { $_.ParentProcessId -in $presenceCandidates.ProcessId } | Select-Object -First 1
    if (-not $presenceExisting) { $presenceExisting = $presenceCandidates[0] }
    return $presenceExisting.ProcessId
}
function Test-CollectorMutex {
    # $true or $false, and $null only when the mutex cannot be inspected at all.
    $presenceMutex = $null
    try {
        if ([System.Threading.Mutex]::TryOpenExisting($collectorMutexName, [ref]$presenceMutex)) { return $true }
        return $false
    } catch {
        return $null
    } finally {
        if ($presenceMutex) { $presenceMutex.Dispose() }
    }
}
$collectorRunning = Test-CollectorMutex
if ($null -eq $collectorRunning) { $collectorRunning = (Get-SavedCollectorPid) -gt 0 }
if ($collectorRunning) {
    $presenceRunningPid = Get-RunningCollectorPid
    if ($presenceRunningPid -gt 0) {
        Set-Content -LiteralPath $presencePidFile -Value $presenceRunningPid -Encoding ASCII
        Write-Host "Collector already running. PID: $presenceRunningPid"
    } else {
        Write-Host "Collector already running. PID unknown (it will be rewritten on the next start)."
    }
    return
}
if (-not $env:PRESENCE_ENDPOINT -and (Test-Path -LiteralPath $presenceSavedEndpoint)) {
    $env:PRESENCE_ENDPOINT = (Get-Content -LiteralPath $presenceSavedEndpoint -Raw).Trim()
}
if (-not $env:PRESENCE_TOKEN -and (Test-Path -LiteralPath $presenceSavedToken) -and (Test-Path -LiteralPath $presenceSavedEndpoint) -and $env:PRESENCE_ENDPOINT -eq (Get-Content -LiteralPath $presenceSavedEndpoint -Raw).Trim()) {
    $presenceSecret = Import-Clixml -LiteralPath $presenceSavedToken
    $env:PRESENCE_TOKEN = [System.Net.NetworkCredential]::new("", $presenceSecret).Password
}
if ($NonInteractive -and (-not $env:PRESENCE_ENDPOINT -or -not $env:PRESENCE_TOKEN)) {
    throw "Saved presence endpoint or token is missing. Run start.ps1 interactively to configure it."
}
if (-not $env:PRESENCE_ENDPOINT) { $env:PRESENCE_ENDPOINT = Read-Host "Worker HTTPS /status URL" }
if (-not $env:PRESENCE_TOKEN) {
    $presenceSecret = Read-Host "Worker PRESENCE_TOKEN (hidden)" -AsSecureString
    $env:PRESENCE_TOKEN = [System.Net.NetworkCredential]::new("", $presenceSecret).Password
}
try {
    if ($Background -or $NonInteractive) {
        $collectorLogDir = Join-Path $env:LOCALAPPDATA "FireflyPresence"
        New-Item -ItemType Directory -Path $collectorLogDir -Force | Out-Null
        $collectorLogStamp = Get-Date -Format "yyyyMMdd-HHmmss"
        # The collector writes its own PID once it holds the session mutex; drop
        # the old file first so a stale value cannot be read as the new process.
        Remove-Item -LiteralPath $presencePidFile -ErrorAction SilentlyContinue
        $collectorProcess = Start-Process -FilePath $collectorPython -ArgumentList ('"' + $collectorScript + '"') -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $collectorLogDir "$collectorLogStamp.log") -RedirectStandardError (Join-Path $collectorLogDir "$collectorLogStamp.error.log")
        $collectorActualPid = 0
        for ($collectorWait = 0; $collectorWait -lt 40; $collectorWait++) {
            Start-Sleep -Milliseconds 250
            if (Test-Path -LiteralPath $presencePidFile) {
                $collectorReportedPid = 0
                if ([int]::TryParse((Get-Content -LiteralPath $presencePidFile -Raw).Trim(), [ref]$collectorReportedPid)) { $collectorActualPid = $collectorReportedPid; break }
            }
            if ($collectorProcess.HasExited) { break }
        }
        if ($collectorActualPid -gt 0) {
            Write-Host "Collector started. PID: $collectorActualPid"
            Write-Host "Stop with: Stop-Process -Id $collectorActualPid"
        } else {
            Write-Host "Collector started. PID will be saved to $presencePidFile"
            Write-Host "If it stops immediately, read $collectorLogDir\$collectorLogStamp.error.log"
        }
        if (-not $Background) {
            $collectorProcess.WaitForExit()
            # Windows PowerShell 5.1 cannot report ExitCode for a redirected
            # Start-Process, so only fail on a code that is actually available.
            if ($null -ne $collectorProcess.ExitCode -and $collectorProcess.ExitCode -ne 0) { throw "Collector exited with code $($collectorProcess.ExitCode)" }
        }
    } else {
        & $collectorPython $collectorScript
        if ($LASTEXITCODE -ne 0) { throw "Collector exited with code $LASTEXITCODE" }
    }
} finally {
    Remove-Item Env:PRESENCE_TOKEN -ErrorAction SilentlyContinue
}
