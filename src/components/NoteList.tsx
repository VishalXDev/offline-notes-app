import { useEffect, useState } from "react";
import NoteEditor from "./NoteEditor";
import { createNote, getAllNotes, deleteNote } from "../services/noteService";
import type { Note } from "../db/notesDb";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    const data = await getAllNotes();
    setNotes(data);
    setFilteredNotes(data);
  };

  const handleNewNote = async () => {
    await createNote("Untitled", "");
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      )
    );
  };

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

      <input
        type="text"
        placeholder="Search notes..."
        className="border rounded px-3 py-1 w-full my-4"
        onChange={handleSearch}
      />

      <div className="grid gap-4">
        {filteredNotes.length === 0 && <p className="text-gray-500">No notes found.</p>}

        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 shadow rounded border cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setSelectedNote(note)}
          >
            <h2 className="font-semibold text-lg">
              {note.title || "Untitled"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">
              {note.synced ? "Synced" : "Unsynced"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id).then(loadNotes);
              }}
              className="text-sm text-red-600 mt-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
