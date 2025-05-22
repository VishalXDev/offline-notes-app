// src/components/NoteEditor.tsx
import { useEffect, useState } from 'react';
import { Note } from '../db/notesDb';
import { db } from '../db/notesDb';
import ReactMarkdown from 'react-markdown';
interface NoteEditorProps {
  note: Note;
  onClose: () => void;
}

const NoteEditor = ({ note, onClose }: NoteEditorProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState('Synced');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const updated = {
        ...note,
        title,
        content,
        updatedAt: new Date().toISOString(),
        synced: false,
      };
      await db.notes.put(updated);
      setStatus('Unsynced (Saved Locally)');
    }, 500);

    return () => clearTimeout(timeout); // debounce
  }, [title, content]);

  return (
    <input
  type="text"
  placeholder="Search notes..."
  className="mt-4 mb-4 p-2 border w-full rounded"
  onChange={(e) => {
    const query = e.target.value.toLowerCase();
    setNotes(prev =>
      prev.filter(
        note =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      )
    );
  }}
/>

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button onClick={onClose} className="text-red-600 hover:underline">Close</button>
        </div>

        <input
          className="w-full border rounded p-2 mb-3 text-lg"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded p-2 h-40 resize-none"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <p className="text-sm text-gray-500 mt-2">{status}</p>
      </div>
      <h3 className="mt-6 mb-2 font-semibold">Preview</h3>
<div className="prose prose-sm max-w-none bg-gray-50 border p-3 rounded">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
    </div>
  );
};

export default NoteEditor;
