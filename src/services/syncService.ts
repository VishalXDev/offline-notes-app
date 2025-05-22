// src/services/syncService.ts
import { db } from '../db/notesDb';
import { Note } from '../db/notesDb';

const API_URL = 'http://localhost:3001/notes';

export const syncNotes = async () => {
  const unsyncedNotes = await db.notes.where('synced').equals(false).toArray();

  for (const note of unsyncedNotes) {
    try {
      // Check if it already exists on server
      const res = await fetch(`${API_URL}/${note.id}`);
      const exists = res.ok;

      const method = exists ? 'PUT' : 'POST';
      const url = exists ? `${API_URL}/${note.id}` : API_URL;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });

      // Mark as synced
      await db.notes.update(note.id, { synced: true });
    } catch (err) {
      console.error(`Failed to sync note ${note.id}`, err);
    }
  }
};
