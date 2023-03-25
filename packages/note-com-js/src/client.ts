import { CREATOR, END_POINT_V1, END_POINT_V2 } from "./constants";

export function makeNoteApiClient() {
  return {
    async getUser() {
      const endpoint = `${END_POINT_V2}/creators/${CREATOR}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch user data from ${endpoint}`);
      }
    },
    async getNoteText(key: string) {
      const endpoint = `${END_POINT_V1}/notes/${key}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch note text data from ${endpoint}`);
      }
    },
    async getUserContents() {
      const endpoint = `${END_POINT_V2}/creators/${CREATOR}/contents?kind=note`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch note contents data from ${endpoint}`);
      }
    },
  };
}
