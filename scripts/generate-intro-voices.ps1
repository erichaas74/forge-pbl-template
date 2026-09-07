# Authoring utility. Regenerates local synthesized narration from the same captions the UI uses.
param([string[]]$Manifests = @('unlabeled-shelf', 'senate'))
$ErrorActionPreference = 'Stop'
$introRepoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$introPublicRoot = [IO.Path]::GetFullPath((Join-Path $introRepoRoot 'public'))
Add-Type -AssemblyName System.Speech
$introSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  foreach ($introName in $Manifests) {
  if ($introName -notin @('unlabeled-shelf', 'senate', 'frontier')) { throw 'Unknown narration manifest.' }
  $introManifest = Join-Path $introRepoRoot ('src/app/projects/intro-scenes/' + $introName + '.dialogue.json')
  $introDialogue = Get-Content -LiteralPath $introManifest -Encoding UTF8 -Raw | ConvertFrom-Json
  foreach ($introBeat in $introDialogue.PSObject.Properties) {
    foreach ($introLine in $introBeat.Value) {
      $introTarget = [IO.Path]::GetFullPath((Join-Path $introPublicRoot $introLine.audioUrl.TrimStart('/')))
      if (-not $introTarget.StartsWith($introPublicRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Narration asset path must stay within this workspace public directory.'
      }
      [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($introTarget)) | Out-Null
      if ($introLine.speaker -in @('scientist', 'Senator Lucius', 'Senator Cassius') -or $introName -eq 'frontier') {
        $introSynth.SelectVoice('Microsoft David Desktop')
        $introSynth.Rate = 0
        if ($introLine.speaker -eq 'Senator Cassius') { $introSynth.Rate = -1 }
      } else {
        $introSynth.SelectVoice('Microsoft Zira Desktop')
        $introSynth.Rate = 1
      }
      $introSynth.SetOutputToWaveFile($introTarget)
      $introSynth.Speak([string]$introLine.text)
      $introSynth.SetOutputToNull()
      Write-Output ('Generated ' + $introLine.audioUrl)
    }
  }
  }
} finally { $introSynth.Dispose() }
