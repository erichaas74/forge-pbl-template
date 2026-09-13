# Reproducible local synthetic museum-guide narration. No external service or voice impersonation.
param([string]$Package = 'public/projects/shadow-gallery/versions/1.1.0/project.json')
$ErrorActionPreference = 'Stop'
$encounterRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$encounterPublic = [IO.Path]::GetFullPath((Join-Path $encounterRoot 'public'))
$encounterPackage = [IO.Path]::GetFullPath((Join-Path $encounterRoot $Package))
if (-not $encounterPackage.StartsWith($encounterPublic + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Package must be inside workspace public directory.' }
$encounterData = Get-Content -LiteralPath $encounterPackage -Raw -Encoding UTF8 | ConvertFrom-Json
$encounterFfmpeg = & node -e "console.log(require('ffmpeg-static'))"
Add-Type -AssemblyName System.Speech
$encounterVoice = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $encounterVoice.SelectVoice('Microsoft Zira Desktop')
  $encounterVoice.Rate = -1
  foreach ($encounter in $encounterData.encounters) {
    foreach ($line in @($encounter.chapters) + @($encounter.questions)) {
      $encounterTarget = [IO.Path]::GetFullPath((Join-Path $encounterPublic $line.audioSrc.TrimStart('/')))
      if (-not $encounterTarget.StartsWith($encounterPublic + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Audio target must stay inside workspace public directory.' }
      [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($encounterTarget)) | Out-Null
      $encounterWav = [IO.Path]::ChangeExtension($encounterTarget, '.tmp.wav')
      $encounterVoice.SetOutputToWaveFile($encounterWav)
      $encounterVoice.Speak([string]$line.text)
      $encounterVoice.SetOutputToNull()
      & $encounterFfmpeg -nostdin -y -loglevel error -i $encounterWav -c:a aac -b:a 64k -ac 1 -ar 22050 $encounterTarget
      if ($LASTEXITCODE -ne 0) { throw 'Audio conversion failed.' }
      Remove-Item -LiteralPath $encounterWav
      Write-Output ('Generated ' + $line.audioSrc)
    }
  }
} finally { $encounterVoice.Dispose() }
