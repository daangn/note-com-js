import type { User, Note, Contents } from "./types";

import { END_POINT_V1, END_POINT_V2 } from "./constants";

export function makeNoteApiClient() {
  return {
    async getUser(creator: string) {
      const endpoint = `${END_POINT_V2}/creators/${creator}`;

      try {
        const response = await fetch(endpoint);
        const { data } = (await response.json()) as {
          data: User;
        };
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch user data from ${endpoint}`);
      }
    },
    async getNoteText(key: string) {
      const endpoint = `${END_POINT_V1}/notes/${key}`;

      try {
        const response = await fetch(endpoint);
        const { data } = (await response.json()) as {
          data: Note;
        };
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch note text data from ${endpoint}`);
      }
    },
    async getUserContents(creator: string) {
      const endpoint = `${END_POINT_V2}/creators/${creator}/contents?kind=note`;

      try {
        const response = await fetch(endpoint);
        const { data } = (await response.json()) as {
          data: Contents;
        };
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch note contents data from ${endpoint}`);
      }
    },
  };
}
