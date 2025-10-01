# Convert all audio files to MP3 and fix naming
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Converting and Fixing Audio Files" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
$audioDir = "F:\ElseWhere - Ambient Life Simulator Web App (Solo Founder MVP)\public\audio"

# Get all audio files except .md files
$files = Get-ChildItem $audioDir -File | Where-Object { $_.Extension -ne ".md" }

$converted = 0
$fixed = 0

Write-Host "Found $($files.Count) audio files to process" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    $baseName = $file.BaseName
    $extension = $file.Extension
    
    # Determine correct final name
    if ($baseName -match "^(.+?)-ambient\.mp3$") {
        # File like "tokyo-ambient.mp3.wav" -> should be "tokyo-ambient.mp3"
        $correctName = "$($Matches[1])-ambient.mp3"
    } elseif ($baseName -match "^(.+?)-ambient$") {
        # File like "tokyo-ambient.wav" -> should be "tokyo-ambient.mp3"
        $correctName = "$($Matches[1])-ambient.mp3"
    } elseif ($baseName -eq "french street ambience") {
        # Special case for Paris
        $correctName = "paris-ambient.mp3"
    } else {
        Write-Host "Skipping unknown file: $($file.Name)" -ForegroundColor Gray
        continue
    }
    
    $outputPath = Join-Path $audioDir $correctName
    
    # If file is already correct format and name, skip
    if ($file.Name -eq $correctName -and $extension -eq ".mp3") {
        Write-Host "[OK] $correctName already correct" -ForegroundColor Green
        continue
    }
    
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    Write-Host "   -> Converting to: $correctName" -ForegroundColor Yellow
    
    try {
        # Convert to MP3 using ffmpeg
        if ($extension -ne ".mp3") {
            ffmpeg -i "$($file.FullName)" -acodec libmp3lame -ab 192k -y "$outputPath" 2>&1 | Out-Null
            if (Test-Path $outputPath) {
                Remove-Item $file.FullName -Force
                Write-Host "   SUCCESS - Converted and renamed" -ForegroundColor Green
                $converted++
            } else {
                Write-Host "   FAILED - Conversion failed" -ForegroundColor Red
            }
        } else {
            # Just rename if already MP3
            Move-Item -Path $file.FullName -Destination $outputPath -Force
            Write-Host "   SUCCESS - Renamed" -ForegroundColor Green
            $fixed++
        }
    }
    catch {
        Write-Host "   ERROR: $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "COMPLETE!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Converted: $converted files" -ForegroundColor Yellow
Write-Host "Renamed: $fixed files" -ForegroundColor Yellow
Write-Host ""
Write-Host "Verifying final files..." -ForegroundColor Cyan
Write-Host ""

$finalFiles = Get-ChildItem "$audioDir\*-ambient.mp3" -File | Sort-Object Name
Write-Host "Total city sounds: $($finalFiles.Count) / 30" -ForegroundColor Yellow
Write-Host ""

if ($finalFiles.Count -eq 30) {
    Write-Host "PERFECT! All 30 cities ready!" -ForegroundColor Green
} else {
    Write-Host "Missing cities:" -ForegroundColor Red
    $expectedCities = @(
        "amsterdam", "bangkok", "barcelona", "berlin", "buenos-aires",
        "cairo", "cape-town", "chicago", "dubai", "hongkong",
        "istanbul", "lisbon", "london", "los-angeles", "marrakech",
        "melbourne", "mexico-city", "moscow", "mumbai", "newyork",
        "paris", "prague", "rio", "rome", "seoul",
        "shanghai", "singapore", "sydney", "tokyo", "toronto"
    )
    
    $existingCities = $finalFiles | ForEach-Object { $_.BaseName -replace "-ambient", "" }
    
    foreach ($city in $expectedCities) {
        if ($city -notin $existingCities) {
            Write-Host "  - $city-ambient.mp3" -ForegroundColor Red
        }
    }
}

Write-Host ""
