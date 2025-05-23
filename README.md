# 📝 Offline Notes App
This is a basic note-taking app that works even when you're offline. You can create, edit, and delete notes — and when you come back online, the app will sync everything to a backend server automatically.
## ✨ Features
- Create, edit, and delete notes
- Supports markdown with live preview
- Works offline using IndexedDB (via Dexie)
- Syncs automatically when you're online
- Shows sync status (Synced or Unsynced)
- Displays sync progress in the header
- Clean and mobile-friendly UI using Tailwind CSS
## 🛠️ Tech Stack
- React + TypeScript
- Vite
- Dexie.js (for offline IndexedDB)
- json-server (mock backend)
- react-markdown (for markdown rendering)
## ▶️ How to Run the App

### 1. Install dependencies
'''bash
npm install
# 2. Start the backend (json-server)
'''npx json-server --watch db.json --port 3001
