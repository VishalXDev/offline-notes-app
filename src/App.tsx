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
      <h1 className="text-3xl font-bold">Offline Notes App</h1>
      <p className="text-gray-600 mt-2">
        {isOnline ? 'Online — syncing enabled' : 'Offline — working locally'}
      </p>
      <NoteList />
    </div>
  );
}

export default App;
