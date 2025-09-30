# ✅ Audio Download Checklist - DO THIS NOW!

## 🎯 Goal: Download 10 audio files (30 minutes total)

---

## 📋 BEFORE YOU START

1. **Create Freesound account**: https://freesound.org/home/register/
   - Takes 5 minutes
   - Check email to verify
   - Log in

---

## 📥 DOWNLOAD EACH FILE (Check ✅ as you go)

### 1. Tokyo 🗾
- [ ] Go to: https://freesound.org/people/klankbeeld/sounds/243911/
- [ ] Click "Download" button
- [ ] Save as: `tokyo-ambient.mp3`
- [ ] File saved!

---

### 2. Paris 🗼
- [ ] Go to: https://freesound.org/people/gis_sweden/sounds/411749/
- [ ] Click "Download" button
- [ ] Save as: `paris-ambient.mp3`
- [ ] File saved!

---

### 3. New York 🗽
- [ ] Go to: https://freesound.org/people/klankbeeld/sounds/243909/
- [ ] Click "Download" button
- [ ] Save as: `newyork-ambient.mp3`
- [ ] File saved!

---

### 4. Rio 🎭
- [ ] Go to: https://freesound.org/people/Leandros/sounds/176092/
- [ ] Click "Download" button
- [ ] Save as: `rio-ambient.mp3`
- [ ] File saved!

---

### 5. Sydney 🏖️
- [ ] Go to: https://freesound.org/people/felix.blume/sounds/264878/
- [ ] Click "Download" button
- [ ] Save as: `sydney-ambient.mp3`
- [ ] File saved!

---

### 6. London 🎡
- [ ] Go to: https://freesound.org/people/simon_lacelle/sounds/47330/
- [ ] Click "Download" button
- [ ] Save as: `london-ambient.mp3`
- [ ] File saved!

---

### 7. Berlin 🐻
- [ ] Go to: https://freesound.org/people/felix.blume/sounds/242938/
- [ ] Click "Download" button
- [ ] Save as: `berlin-ambient.mp3`
- [ ] File saved!

---

### 8. Dubai 🏙️
- [ ] Go to: https://freesound.org/people/juskiddink/sounds/119673/
- [ ] Click "Download" button
- [ ] Save as: `dubai-ambient.mp3`
- [ ] File saved!

---

### 9. Mumbai 🛺
- [ ] Go to: https://freesound.org/people/felix.blume/sounds/242942/
- [ ] Click "Download" button
- [ ] Save as: `mumbai-ambient.mp3`
- [ ] File saved!

---

### 10. Seoul 🏯
- [ ] Go to: https://freesound.org/people/felix.blume/sounds/264877/
- [ ] Click "Download" button
- [ ] Save as: `seoul-ambient.mp3`
- [ ] File saved!

---

## 📁 MOVE FILES TO APP

After downloading all 10 files, run this command:

```powershell
# Move all files from Downloads to your app
Move-Item -Path "$env:USERPROFILE\Downloads\*ambient*.mp3" -Destination "F:\ElseWhere - Ambient Life Simulator Web App (Solo Founder MVP)\public\audio\"
```

**OR** manually:
1. Open Downloads folder
2. Select all 10 files
3. Cut (Ctrl+X)
4. Go to: `F:\ElseWhere - Ambient Life Simulator Web App (Solo Founder MVP)\public\audio\`
5. Paste (Ctrl+V)

---

## ✅ VERIFY FILES

Run this command to check all files are there:

```powershell
Get-ChildItem "F:\ElseWhere - Ambient Life Simulator Web App (Solo Founder MVP)\public\audio\*.mp3"
```

You should see **10 files**:
- tokyo-ambient.mp3
- paris-ambient.mp3
- newyork-ambient.mp3
- rio-ambient.mp3
- sydney-ambient.mp3
- london-ambient.mp3
- berlin-ambient.mp3
- dubai-ambient.mp3
- mumbai-ambient.mp3
- seoul-ambient.mp3

---

## 🚀 DONE? TEST THE APP!

```powershell
npm run dev
```

Open: http://localhost:3000

Test each city and hear the sounds! 🎉

---

## 🆘 If a Link Doesn't Work

**Backup Plan**: Use any similar sound from Freesound.org
1. Search for: "[city name] ambient" or "street sounds"
2. Download any CC0 or CC-BY licensed file
3. Rename to match the city
4. That's it!

---

**Total Time**: 30-40 minutes
**Difficulty**: Easy - just clicking and downloading! 😊