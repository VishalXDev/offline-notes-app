import './App.css';
import NoteList from './components/NoteList';
import useOnlineStatus from './hooks/useOnlineStatus';
import { useEffect, useState } from 'react';
import { syncNotes } from './services/syncService';

function App() {
  const isOnline = useOnlineStatus();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOnline) {
      setSyncStatus("Syncing...");
      syncNotes().then(() => setSyncStatus("All notes synced!"));
    }
  }, [isOnline]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`w-3 h-3 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        <p className="text-sm text-gray-600">
          {isOnline ? 'Online' : 'Offline'}
        </p>
        {syncStatus && isOnline && (
          <p className="ml-4 text-sm text-blue-600">{syncStatus}</p>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-4">Offline Notes App</h1>
      <NoteList />
    </div>
  );
}

export default App;
