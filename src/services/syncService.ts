import { db } from "../db/notesDb";

const API_URL = "http://localhost:3001/notes";

export const syncNotes = async () => {
  console.log("Syncing started...");

  const allNotes = await db.notes.toArray();
  const unsyncedNotes = allNotes
    .filter((note) => note.synced === false)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  for (const note of unsyncedNotes) {
    try {
      const res = await fetch(`${API_URL}/${note.id}`);
      const exists = res.ok;

      const method = exists ? "PUT" : "POST";
      const url = exists ? `${API_URL}/${note.id}` : API_URL;

      const syncRes = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (!syncRes.ok) {
        console.warn(`Sync failed for ${note.id}: ${syncRes.status}`);
        continue;
      }

      await db.notes.update(note.id, { synced: true });
    } catch (err) {
      console.error(`Sync error for ${note.id}`, err);
    }
  }
  const deleted = await db.deletedNotes.toArray();

  for (const item of deleted) {
    try {
      const res = await fetch(`${API_URL}/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      await db.deletedNotes.delete(item.id);
    } catch (err) {
      console.error(`Failed to delete ${item.id}`, err);
    }
  }

  console.log("Sync complete!");
};
