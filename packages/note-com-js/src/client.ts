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
        throw new Error(`Failed to fetch user data from note.com`);
      }
    },
    async getNote(key: string) {
      const endpoint = `${END_POINT_V1}/notes/${key}`;

      try {
        const response = await fetch(endpoint);
        const { data } = (await response.json()) as {
          data: Note;
        };
        return data;
      } catch (e) {
        throw new Error(`Failed to fetch note text data from note.com`);
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
        throw new Error(`Failed to fetch note contents data from note.com`);
      }
    },
    async getAllUserContents(creator: string) {
      const endpoint = `${END_POINT_V2}/creators/${creator}/contents?kind=note`;

      try {
        const response = await fetch(endpoint);
        const { data } = (await response.json()) as {
          data: Contents;
        };
        const lastPageIndex = Math.ceil(data.totalCount / 6);

        if (data.isLastPage && lastPageIndex === 1) {
          return [...data.contents];
        }

        const endpoints = Array.from({ length: lastPageIndex }, (v, k) => {
          if (!!k) {
            return `${endpoint}&page=${k + 1}`;
          }
        }).slice(1) as string[];

        const restData = await Promise.all(endpoints.map((ep) => fetch(ep)))
          .then((responses) =>
            Promise.all(
              responses.map(
                (r) =>
                  r.json() as Promise<{
                    data: Contents;
                  }>,
              ),
            ),
          )
          .then((responses) => [...data.contents, ...responses.map((r) => r.data.contents).flat()]);

        return restData;
      } catch (e) {
        throw new Error(`Failed to fetch note contents data from note.com`);
      }
    },
    // TODO: Sourcing categories
  };
}
