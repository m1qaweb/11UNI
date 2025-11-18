$file = "src\lib\data\menu-packages.ts"
$content = Get-Content $file -Raw

$content = $content -replace "const (main\d+) = '/src/assets/", "import `$1 from '`$`$assets/"
$content = $content -replace "const (seafood\d+) = '/src/assets/", "import `$1 from '`$`$assets/"
$content = $content -replace "const (sushi\d+) = '/src/assets/", "import `$1 from '`$`$assets/"
$content = $content -replace "const (soup\d+) = '/src/assets/", "import `$1 from '`$`$assets/"
$content = $content -replace "const (burger\d+) = '/src/assets/", "import `$1 from '`$`$assets/"
$content = $content -replace "const (beverage\d+) = '/src/assets/", "import `$1 from '`$`$assets/"

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Fixed all image imports in $file"
