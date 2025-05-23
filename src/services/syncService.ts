import { db } from "../db/notesDb";
const API_URL = "http://localhost:3001/notes";

export const syncNotes = async () => {
  const allNotes = await db.notes.toArray();
  const unsyncedNotes = allNotes.filter((note) => note.synced === false);

  for (const note of unsyncedNotes) {
    try {
      const res = await fetch(`${API_URL}/${note.id}`);
      const exists = res.ok;

      const method = exists ? "PUT" : "POST";
      const url = exists ? `${API_URL}/${note.id}` : API_URL;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      await db.notes.update(note.id, { synced: true });
    } catch (err) {
      console.error(`Failed to sync note ${note.id}`, err);
    }
  }
};
