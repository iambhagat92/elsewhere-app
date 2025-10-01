# Fix Mumbai and other cities with REAL authentic street sounds
# This downloads proper city ambience with traffic, people, local atmosphere

Write-Host "Fixing City Sounds - Authentic Street Ambience" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$outputDir = "F:\ElseWhere - Ambient Life Simulator Web App (Solo Founder MVP)\public\audio"

# Authentic city street sounds with REAL traffic, people, local vibe
$cityUrls = @{
    "mumbai-ambient.mp3" = "https://youtu.be/pgXozIma-Oc"  # Real Mumbai street - traffic, horns, chaos
    "tokyo-ambient.mp3" = "https://youtu.be/S-W9LibrW6g"  # Tokyo street crossing - busy authentic
    "newyork-ambient.mp3" = "https://youtu.be/7p79Y2qCAl4"  # NYC street - real traffic
    "paris-ambient.mp3" = "https://youtu.be/g-EvyutUjDY"  # Paris street cafe real ambience
    "london-ambient.mp3" = "https://youtu.be/W8NOTPmcWK0"  # London street real sounds
    "dubai-ambient.mp3" = "https://youtu.be/7vDz_KKm4DQ"  # Dubai street traffic
    "bangkok-ambient.mp3" = "https://youtu.be/akGWOpcWfrQ"  # Bangkok tuk-tuk traffic real
    "istanbul-ambient.mp3" = "https://youtu.be/VQxhi41jCS8"  # Istanbul bazaar real atmosphere
    "cairo-ambient.mp3" = "https://youtu.be/KdQLeWW9PcM"  # Cairo street real chaos
}

$total = $cityUrls.Count
$current = 0

Write-Host "Downloading $total cities with AUTHENTIC street sounds..." -ForegroundColor Green
Write-Host ""

foreach ($city in $cityUrls.GetEnumerator()) {
    $current++
    $filename = $city.Key
    $url = $city.Value
    $cityName = $filename -replace "-ambient.mp3", ""
    
    Write-Host "[$current/$total] Downloading: $cityName (REAL street sounds)" -ForegroundColor Yellow
    
    $outputPath = Join-Path $outputDir $filename
    
    # Backup old file
    if (Test-Path $outputPath) {
        $backupPath = $outputPath -replace ".mp3", "-old.mp3"
        Move-Item -Path $outputPath -Destination $backupPath -Force
        Write-Host "    Backed up old file" -ForegroundColor Gray
    }
    
    try {
        yt-dlp -x --audio-format mp3 --audio-quality 192K -o "$outputPath" "$url" 2>&1 | Out-Null
        
        if (Test-Path $outputPath) {
            Write-Host "    SUCCESS: $filename (Authentic)" -ForegroundColor Green
        } else {
            Write-Host "    FAILED: $filename" -ForegroundColor Red
            # Restore backup if download failed
            $backupPath = $outputPath -replace ".mp3", "-old.mp3"
            if (Test-Path $backupPath) {
                Move-Item -Path $backupPath -Destination $outputPath -Force
                Write-Host "    Restored old file" -ForegroundColor Yellow
            }
        }
    }
    catch {
        Write-Host "    ERROR: $_" -ForegroundColor Red
        # Restore backup
        $backupPath = $outputPath -replace ".mp3", "-old.mp3"
        if (Test-Path $backupPath) {
            Move-Item -Path $backupPath -Destination $outputPath -Force
        }
    }
    
    Write-Host ""
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "DONE! Cities updated with REAL street sounds" -ForegroundColor Green
Write-Host ""
Write-Host "Test on localhost:3000 and check Mumbai now!" -ForegroundColor Yellow
Write-Host ""
