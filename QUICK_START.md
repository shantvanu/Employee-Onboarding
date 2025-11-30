# Quick Start Guide

## ✅ Setup Complete!

Dependencies have been installed for both backend and frontend.

## 🚀 Starting the Servers

### Option 1: Using Separate Terminal Windows (Recommended)

#### Terminal 1 - Backend Server
```powershell
cd backend
npm start
```
Backend will run on: **http://localhost:5600**

#### Terminal 2 - Frontend Server
```powershell
cd frontend
npm run dev
```
Frontend will run on: **http://localhost:5173**

---

### Option 2: Using PowerShell Background Jobs

#### Start Backend
```powershell
cd backend
Start-Job -ScriptBlock { Set-Location "C:\Users\ragha\OneDrive\Desktop\Assignment\Employee-Onboarding\backend"; npm start }
```

#### Start Frontend
```powershell
cd frontend
Start-Job -ScriptBlock { Set-Location "C:\Users\ragha\OneDrive\Desktop\Assignment\Employee-Onboarding\frontend"; npm run dev }
```

#### Check Running Jobs
```powershell
Get-Job
```

#### View Job Output
```powershell
Receive-Job -Id <JobId>
```

---

## ✅ Verify Servers Are Running

### Check Backend
```powershell
Invoke-WebRequest -Uri "http://localhost:5600/health"
```
Should return: `{"status":"ok"}`

### Check Frontend
Open browser and navigate to: **http://localhost:5173**

---

## 📝 Quick Commands Reference

### Backend
```powershell
# Navigate to backend
cd backend

# Install dependencies (if needed)
npm install

# Start server
npm start

# Development mode (auto-restart)
npm run dev
```

### Frontend
```powershell
# Navigate to frontend
cd frontend

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🔍 Troubleshooting

### Backend won't start
- Check if port 5600 is available
- Verify Node.js is installed: `node --version`
- Check for errors in terminal output

### Frontend won't start
- Check if port 5173 is available
- Verify dependencies are installed: `Test-Path node_modules`
- Try deleting `node_modules` and `package-lock.json`, then `npm install`

### "vite is not recognized" error
- Run `npm install` in frontend directory
- Verify `node_modules/.bin` contains vite

---

## 🌐 Access URLs

Once both servers are running:

- **Frontend Application**: http://localhost:5173
- **Backend API Health**: http://localhost:5600/health
- **Backend API Schema**: http://localhost:5600/api/form-schema

---

## 📚 Next Steps

1. Open http://localhost:5173 in your browser
2. Fill out the Employee Onboarding form
3. Submit the form
4. View submissions in the Submissions page
5. Test all features (search, edit, delete, CSV export, dark mode)

---

**Note**: Keep both terminal windows open while developing. Press `Ctrl+C` in each terminal to stop the servers.

