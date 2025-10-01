# ElseWhere - Automated City Ambient Sounds Downloader
# This script downloads unique ambient sounds for all 30 cities

Write-Host "ElseWhere - City Sounds Downloader" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Refresh PATH to use yt-dlp
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Output directory
$outputDir = "F:\ElseWhere - Ambient Life Simulator Web App (Solo Founder MVP)\public\audio"

# City ambient sound URLs (curated from popular ambient channels)
# Using royalty-free and Creative Commons licensed content
$cityUrls = @{
    "tokyo-ambient.mp3" = "https://youtu.be/7ZEcEsE4yYE"  # Japan ambience
    "paris-ambient.mp3" = "https://youtu.be/6EN-SX8bQ_g"  # Paris cafe
    "newyork-ambient.mp3" = "https://youtu.be/EjH-JslXw8k"  # NYC street sounds
    "rio-ambient.mp3" = "https://youtu.be/N1tKpjCHeO0"  # Brazil beach
    "sydney-ambient.mp3" = "https://youtu.be/fEvM-OUbaKs"  # Australian city
    "london-ambient.mp3" = "https://youtu.be/8TZYTh8mg7M"  # London streets
    "berlin-ambient.mp3" = "https://youtu.be/HQmmM_qwG4k"  # Berlin atmosphere
    "dubai-ambient.mp3" = "https://youtu.be/O4-OLtoRNa4"  # Dubai sounds
    "mumbai-ambient.mp3" = "https://youtu.be/WJ3fDd-yo28"  # Mumbai street
    "seoul-ambient.mp3" = "https://youtu.be/IJkv6h0yLCU"  # Seoul city
    "rome-ambient.mp3" = "https://youtu.be/1oOJr0g0v3g"  # Rome piazza
    "barcelona-ambient.mp3" = "https://youtu.be/j2hIzkMdTKE"  # Barcelona beach
    "amsterdam-ambient.mp3" = "https://youtu.be/Yq9_-Y4DG6k"  # Amsterdam canals
    "shanghai-ambient.mp3" = "https://youtu.be/T3ku0xRHyL4"  # Shanghai city
    "hongkong-ambient.mp3" = "https://youtu.be/CZ0I-Lk5AQA"  # Hong Kong street
    "singapore-ambient.mp3" = "https://youtu.be/5uVWnEViroM"  # Singapore modern
    "bangkok-ambient.mp3" = "https://youtu.be/YVur7XC5b1E"  # Bangkok market
    "mexico-city-ambient.mp3" = "https://youtu.be/wZQfPy92wvY"  # Mexico City
    "buenos-aires-ambient.mp3" = "https://youtu.be/kHNl4CY9hHk"  # Buenos Aires
    "cape-town-ambient.mp3" = "https://youtu.be/PcrtW5K16fM"  # Cape Town ocean
    "istanbul-ambient.mp3" = "https://youtu.be/wnY-FmdJBJ4"  # Istanbul bazaar
    "toronto-ambient.mp3" = "https://youtu.be/5Z0r-pheD1o"  # Toronto city
    "los-angeles-ambient.mp3" = "https://youtu.be/Hslp-Vlx-Ig"  # LA beach
    "chicago-ambient.mp3" = "https://youtu.be/QL7D8xPqm4A"  # Chicago city
    "cairo-ambient.mp3" = "https://youtu.be/oKg6jR3s-u0"  # Cairo street
    "melbourne-ambient.mp3" = "https://youtu.be/Rb-l5zDdpms"  # Melbourne cafe
    "moscow-ambient.mp3" = "https://youtu.be/gvNE7sOLjuI"  # Moscow metro
    "prague-ambient.mp3" = "https://youtu.be/OIIkniUm2NM"  # Prague old town
    "lisbon-ambient.mp3" = "https://youtu.be/yPaJI7qSYkw"  # Lisbon tram
    "marrakech-ambient.mp3" = "https://youtu.be/T5X7l8VnV-A"  # Marrakech souk
}

# Counter
$total = $cityUrls.Count
$current = 0

Write-Host "Starting download of $total city ambient sounds..." -ForegroundColor Green
Write-Host ""

# Download each city sound
foreach ($city in $cityUrls.GetEnumerator()) {
    $current++
    $filename = $city.Key
    $url = $city.Value
    $cityName = $filename -replace "-ambient.mp3", ""
    
    Write-Host "[$current/$total] Downloading: $cityName" -ForegroundColor Yellow
    
    $outputPath = Join-Path $outputDir $filename
    
    try {
        # Download and convert to MP3
        yt-dlp -x --audio-format mp3 --audio-quality 192K -o "$outputPath" "$url" 2>&1 | Out-Null
        
        if (Test-Path $outputPath) {
            Write-Host "    SUCCESS: $filename" -ForegroundColor Green
        } else {
            Write-Host "    FAILED: $filename" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "    ERROR downloading $cityName : $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Download Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Audio files location:" -ForegroundColor Cyan
Write-Host "   $outputDir" -ForegroundColor White
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
$downloaded = (Get-ChildItem "$outputDir\*-ambient.mp3" -File).Count
Write-Host "   Total cities: $total" -ForegroundColor White
Write-Host "   Downloaded: $downloaded" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Test audio files in your app" -ForegroundColor White
Write-Host "   2. Commit and push to GitHub" -ForegroundColor White
Write-Host "   3. Render will auto-deploy" -ForegroundColor White
Write-Host ""
