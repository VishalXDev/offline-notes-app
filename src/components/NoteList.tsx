// src/components/NoteList.tsx
import { useEffect, useState } from 'react';
import NoteEditor from './NoteEditor';
import { createNote, getAllNotes } from '../services/noteService';
import { Note } from '../db/notesDb';

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    const data = await getAllNotes();
    setNotes(data);
  };

  const handleNewNote = async () => {
    await createNote('Untitled', '');
    loadNotes(); // Refresh list
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="mt-6">
      {selectedNote && (
        <NoteEditor note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}

      <button
        onClick={handleNewNote}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + New Note
      </button>

      <div className="mt-4 grid gap-4">
        {notes.length === 0 && <p className="text-gray-500">No notes yet.</p>}

        {notes.map(note => (
          <div
            key={note.id}
            className="bg-white p-4 shadow rounded border cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setSelectedNote(note)}
          >
            <h2 className="font-semibold text-lg">{note.title || 'Untitled'}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">{note.synced ? 'Synced' : 'Unsynced'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
