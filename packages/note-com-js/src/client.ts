import type { User, Note, Contents } from "./types";

import { CREATOR, END_POINT_V1, END_POINT_V2 } from "./constants";

export function makeNoteApiClient() {
  return {
    async getUser() {
      const endpoint = `${END_POINT_V2}/creators/${CREATOR}`;

      try {
        const response = await fetch(endpoint);
        return (await response.json()) as {
          data: User;
        };
      } catch (e) {
        throw new Error(`Failed to fetch user data from ${endpoint}`);
      }
    },
    async getNoteText(key: string) {
      const endpoint = `${END_POINT_V1}/notes/${key}`;

      try {
        const response = await fetch(endpoint);
        return (await response.json()) as {
          data: Note;
        };
      } catch (e) {
        throw new Error(`Failed to fetch note text data from ${endpoint}`);
      }
    },
    async getUserContents() {
      const endpoint = `${END_POINT_V2}/creators/${CREATOR}/contents?kind=note`;

      try {
        const response = await fetch(endpoint);
        return (await response.json()) as {
          data: Contents;
        };
      } catch (e) {
        throw new Error(`Failed to fetch note contents data from ${endpoint}`);
      }
    },
  };
}
