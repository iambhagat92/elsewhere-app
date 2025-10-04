# 🔧 ElseWhere Troubleshooting Guide

## Quick Fix for "Server Won't Stop" Issue

If you're having trouble stopping the server or getting the message "but esko roko kaise bhi kar ke" (how to stop this), here's the solution:

### ⚡ INSTANT FIX:

1. **Double-click: `STOP_SERVER.bat`** ← This will kill all running servers
2. **Wait 5 seconds**
3. **Double-click: `START_SERVER.bat`** ← This will start fresh
4. **Double-click: `OPEN_APP.html`** ← This will open the app

---

## 🚨 Common Problems & Solutions

### Problem 1: Server Won't Stop
**Symptoms:** Black window stays open, can't close it
**Solution:**
```
Double-click: STOP_SERVER.bat
```

### Problem 2: Port 3000 Already in Use
**Symptoms:** Error "EADDRINUSE: address already in use :::3000"
**Solution:**
```
Double-click: RESTART_SERVER.bat
```

### Problem 3: App Won't Load
**Symptoms:** Browser shows "This site can't be reached"
**Solution:**
1. Make sure the black window (server) is still open
2. Wait 10 seconds after starting server
3. Try refreshing the browser

### Problem 4: Audio Not Playing
**Symptoms:** App loads but no sound
**Solution:**
1. Check browser volume
2. Click the play button
3. Adjust volume slider
4. Try a different browser

---

## 📁 File Guide

| File | Purpose |
|------|---------|
| `START_SERVER.bat` | Starts the development server |
| `STOP_SERVER.bat` | Stops all running servers |
| `RESTART_SERVER.bat` | Stops and starts fresh |
| `OPEN_APP.html` | Opens the app in browser |

---

## 🔄 Step-by-Step Restart Process

1. **Stop Everything:**
   ```
   Double-click: STOP_SERVER.bat
   ```

2. **Wait 5 seconds**

3. **Start Fresh:**
   ```
   Double-click: START_SERVER.bat
   ```

4. **Wait 10 seconds** (for "Ready" message)

5. **Open App:**
   ```
   Double-click: OPEN_APP.html
   ```

---

## 💻 Manual Commands (Advanced)

If batch files don't work, use these commands in PowerShell:

### Stop Server:
```powershell
# Kill all node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill processes using port 3000
$processes = netstat -ano | findstr :3000
if ($processes) {
    $processes | ForEach-Object {
        $pid = ($_ -split '\s+')[-1]
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
}
```

### Start Server:
```powershell
npm run dev
```

---

## 🌐 Browser Issues

### If app doesn't load:
1. Try different browser (Chrome, Firefox, Edge)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Disable browser extensions
4. Try incognito/private mode

### If audio doesn't work:
1. Check browser audio permissions
2. Try clicking on the page first (browsers require user interaction)
3. Check system volume
4. Try different audio format

---

## 📱 Mobile Issues

### If app doesn't work on phone:
1. Make sure you're on the same WiFi network
2. Use your computer's IP address instead of localhost
3. Find IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
4. Go to: `http://YOUR_IP:3000`

---

## 🆘 Still Having Issues?

### Check These:
- [ ] Node.js is installed (version 18+)
- [ ] You're in the correct folder
- [ ] No antivirus blocking the app
- [ ] Windows Firewall allows Node.js
- [ ] Port 3000 is not blocked

### Get Help:
- Email: bhagatpaaji@gmail.com
- Include: Screenshot of error message
- Include: What you were trying to do

---

## 🎯 Hindi/Hinglish Quick Reference

| Problem (Hindi/Hinglish) | Solution |
|---------------------------|----------|
| "Server band nahi ho raha" | `STOP_SERVER.bat` chalao |
| "App nahi khul raha" | Server start karne ke baad 10 second wait karo |
| "Audio nahi aa raha" | Browser mein volume check karo, play button dabao |
| "Error aa raha hai" | `RESTART_SERVER.bat` chalao |

---

**Remember:** Always keep the black window (server) open while using the app!