param([Parameter(Mandatory=$true)][string]$Manifest, [Parameter(Mandatory=$true)][string]$OutputDirectory)
$ErrorActionPreference = 'Stop'
$exampleRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$exampleOutput = [IO.Path]::GetFullPath((Join-Path $exampleRoot $OutputDirectory))
if (-not $exampleOutput.StartsWith($exampleRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Output must stay inside the repository.' }
[IO.Directory]::CreateDirectory($exampleOutput) | Out-Null
$exampleManifest = Get-Content -LiteralPath (Join-Path $exampleRoot $Manifest) -Raw -Encoding UTF8 | ConvertFrom-Json
Add-Type -AssemblyName System.Speech
$exampleSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  foreach ($item in $exampleManifest.items) {
    for ($sceneIndex=0; $sceneIndex -lt $item.scenes.Count; $sceneIndex++) {
      $scene = $item.scenes[$sceneIndex]
      $exampleSynth.SelectVoice($scene.voice)
      $exampleSynth.Rate = -1
      for ($lineIndex=0; $lineIndex -lt $scene.narration.Count; $lineIndex++) {
        $fileName = '{0}-{1}-{2}.wav' -f $item.id,$sceneIndex,$lineIndex
        $exampleSynth.SetOutputToWaveFile((Join-Path $exampleOutput $fileName))
        $exampleSynth.Speak([string]$scene.narration[$lineIndex])
        $exampleSynth.SetOutputToNull()
      }
    }
    Write-Output ('Narration generated: ' + $item.id)
  }
} finally { $exampleSynth.Dispose() }
