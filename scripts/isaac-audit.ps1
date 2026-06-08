param(
  [string]$Root = ".",
  [switch]$Write,
  [switch]$Force
)

$scriptDirectoryPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$scriptFilePath = Join-Path $scriptDirectoryPath "isaac-audit.mjs"
$arguments = @($scriptFilePath, "--root", $Root)

if ($Write) {
  $arguments += "--write"
}

if ($Force) {
  $arguments += "--force"
}

node @arguments
exit $LASTEXITCODE
