import { db } from '../db/notesDb';
import type { Note } from '../db/notesDb';
import { v4 as uuidv4 } from 'uuid';

export const createNote = async (title = '', content = ''): Promise<Note> => {
  const newNote: Note = {
    id: uuidv4(),
    title,
    content,
    updatedAt: new Date().toISOString(),
    synced: false
  };
  await db.notes.add(newNote);
  return newNote;
};

export const deleteNote = async (id: string): Promise<void> => {
  await db.notes.delete(id);
  await db.deletedNotes.put({ id }); // Track for backend sync
};

export const getAllNotes = async (): Promise<Note[]> => {
  return await db.notes.orderBy('updatedAt').reverse().toArray();
};
