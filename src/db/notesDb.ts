import Dexie from "dexie";
import type { Table } from "dexie";

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  synced: boolean;
}

export interface DeletedNote {
  id: string;
}

class NotesDB extends Dexie {
  notes!: Table<Note, string>;
  deletedNotes!: Table<DeletedNote, string>;

  constructor() {
    super("OfflineNotesDB");
    this.version(1).stores({
      notes: "id, title, updatedAt, synced",
      deletedNotes: "id"
    });
  }
}

export const db = new NotesDB();
