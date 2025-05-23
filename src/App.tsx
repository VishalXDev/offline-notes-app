import './App.css';
import NoteList from './components/NoteList';
import useOnlineStatus from './hooks/useOnlineStatus';
import { useEffect } from 'react';
import { syncNotes } from './services/syncService';

function App() {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      syncNotes();
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
          {isOnline ? 'Online — syncing enabled' : 'Offline — working locally'}
        </p>
      </div>

      <h1 className="text-3xl font-bold">Offline Notes App</h1>
      <NoteList />
    </div>
  );
}

export default App;
