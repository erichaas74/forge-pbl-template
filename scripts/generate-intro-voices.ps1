# Authoring utility. Regenerates local synthesized narration from the same captions the UI uses.
param([string[]]$Manifests = @('unlabeled-shelf', 'senate'), [string[]]$Speakers = @())
$ErrorActionPreference = 'Stop'
$introRepoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$introPublicRoot = [IO.Path]::GetFullPath((Join-Path $introRepoRoot 'public'))
# Narration ships as AAC (.m4a); System.Speech only writes WAV, so synthesized audio is
# transcoded through the ffmpeg-static devDependency. Keeps generated files playable.
$introFfmpeg = & node -e "console.log(require('ffmpeg-static'))"
if (-not $introFfmpeg -or -not (Test-Path -LiteralPath $introFfmpeg)) {
  throw 'ffmpeg-static not found. Run npm install first.'
}
Add-Type -AssemblyName System.Speech
$introSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  foreach ($introName in $Manifests) {
  if ($introName -notin @('unlabeled-shelf', 'senate', 'frontier')) { throw 'Unknown narration manifest.' }
  $introManifest = Join-Path $introRepoRoot ('src/app/projects/intro-scenes/' + $introName + '.dialogue.json')
  $introDialogue = Get-Content -LiteralPath $introManifest -Encoding UTF8 -Raw | ConvertFrom-Json
  foreach ($introBeat in $introDialogue.PSObject.Properties) {
    foreach ($introLine in $introBeat.Value) {
      if ($Speakers.Count -gt 0 -and $introLine.speaker -notin $Speakers) { continue }
      $introTarget = [IO.Path]::GetFullPath((Join-Path $introPublicRoot $introLine.audioUrl.TrimStart('/')))
      if (-not $introTarget.StartsWith($introPublicRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Narration asset path must stay within this workspace public directory.'
      }
      [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($introTarget)) | Out-Null
      if ($introLine.speaker -in @('scientist', 'Senator Lucius', 'Senator Cassius') -or $introName -eq 'frontier') {
        $introSynth.SelectVoice('Microsoft David Desktop')
        $introSynth.Rate = 0
        if ($introLine.speaker -eq 'scientist') { $introSynth.Rate = 3 }
        if ($introLine.speaker -eq 'Senator Cassius') { $introSynth.Rate = -1 }
      } else {
        $introSynth.SelectVoice('Microsoft Zira Desktop')
        $introSynth.Rate = 1
      }
      $introIsWav = [IO.Path]::GetExtension($introTarget) -ieq '.wav'
      $introRaw = if ($introIsWav) { $introTarget } else { [IO.Path]::ChangeExtension($introTarget, '.tmp.wav') }
      $introSynth.SetOutputToWaveFile($introRaw)
      $introSynth.Speak([string]$introLine.text)
      $introSynth.SetOutputToNull()
      if (-not $introIsWav) {
        & $introFfmpeg -nostdin -y -loglevel error -i $introRaw -c:a aac -b:a 48k -ac 1 -ar 22050 $introTarget
        if ($LASTEXITCODE -ne 0) { throw ('Transcode failed for ' + $introLine.audioUrl) }
        Remove-Item -LiteralPath $introRaw -Force
      }
      Write-Output ('Generated ' + $introLine.audioUrl)
    }
  }
  }
} finally { $introSynth.Dispose() }
