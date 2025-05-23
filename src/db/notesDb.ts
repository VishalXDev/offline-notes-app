// src/db/notesDb.ts
import Dexie from 'dexie';
import type { Table } from 'dexie'; // ✅ Fixes verbatimModuleSyntax warning

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  synced: boolean;
}

class NotesDB extends Dexie {
  notes!: Table<Note, string>;

  constructor() {
    super('OfflineNotesDB');
    this.version(1).stores({
      notes: 'id, title, updatedAt, synced', // ✅ 'synced' is indexed
    });
  }
}

export const db = new NotesDB();
