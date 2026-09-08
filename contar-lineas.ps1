<#
.SYNOPSIS
    Lista los archivos de la carpeta 'src' que tienen más de 200 líneas.

.DESCRIPTION
    Recorre recursivamente la carpeta 'src', cuenta las líneas de cada archivo
    y muestra en una tabla los que superan el umbral configurable (200 por defecto),
    ordenados de mayor a menor cantidad de líneas.

.PARAMETER Path
    Ruta base a analizar. Por defecto: 'src' en el directorio actual.

.PARAMETER Threshold
    Cantidad mínima de líneas (estrictamente mayor que) para listar un archivo.
    Por defecto: 200.

.PARAMETER BinaryExtensions
    Extensiones de archivos binarios que se ignoran (imágenes, fuentes, etc.)

.EXAMPLE
    .\contar-lineas.ps1

.EXAMPLE
    .\contar-lineas.ps1 -Threshold 100

.EXAMPLE
    .\contar-lineas.ps1 -Path "C:\proyectos\react-typescript\src" -Threshold 150
#>

param(
    [string]$Path = (Join-Path (Get-Location) 'src'),
    [int]$Threshold = 200,
    [string[]]$BinaryExtensions = @(
        '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.ico', '.webp',
        '.pdf', '.zip', '.rar', '.7z', '.tar', '.gz',
        '.woff', '.woff2', '.ttf', '.eot', '.otf',
        '.mp3', '.mp4', '.wav', '.exe', '.dll', '.bin'
    )
)

if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
    Write-Error "No se encontró la carpeta '$Path'."
    exit 1
}

$files = Get-ChildItem -LiteralPath $Path -Recurse -File |
    Where-Object { $BinaryExtensions -notcontains $_.Extension.ToLower() }

$results = foreach ($file in $files) {
    try {
        $lineCount = @([System.IO.File]::ReadAllLines($file.FullName)).Count
    }
    catch {
        Write-Warning "No se pudo leer el archivo: $($file.FullName)"
        continue
    }

    [PSCustomObject]@{
        Lineas  = $lineCount
        Archivo = $file.FullName
    }
}

$bigFiles = $results | Where-Object { $_.Lineas -gt $Threshold } | Sort-Object Lineas -Descending

if ($null -eq $bigFiles -or @($bigFiles).Count -eq 0) {
    Write-Host "No se encontraron archivos con mas de $Threshold lineas en '$Path'." -ForegroundColor Green
}
else {
    Write-Host "Archivos con mas de $Threshold lineas en '$Path':" -ForegroundColor Cyan
    $bigFiles | Format-Table -AutoSize

    Write-Host "Total de archivos que superan las $Threshold lineas: $(@($bigFiles).Count)" -ForegroundColor Yellow
}