import type { Note, User, CategoryLink } from "note-com-js";
import type { Node } from "gatsby";

export type NoteUserNodeSource = Omit<User, "id"> & {
  userId: number;
};

export type NoteUserNode = Node &
  Omit<User, "id"> & {
    userId: number;
  };

export type NoteTextNoteNodeSource = Omit<Note, "id"> & {
  noteId: number;
};

export type NoteTextNoteNode = Node &
  Omit<Note, "id"> & {
    noteId: number;
  };

export type NoteCategoryNode = Node & Omit<CategoryLink, "id">;

export type NoteCategoryNodeSource = Omit<CategoryLink, "id">;

export type PluginOptions = {
  creator: string;
};
