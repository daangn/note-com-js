import type { NodeInput, GatsbyNode } from "gatsby";
import {
  type EmbeddedContent,
  type HashtagNote,
  type Picture,
  makeNoteApiClient,
} from "note-com-js";

import type {
  NoteUserNodeSource,
  NoteTextNoteNodeSource,
  PluginOptions,
  NoteContentNodeSource,
} from "./types";

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({ Joi }) => {
  return Joi.object({
    creator: Joi.string().required(),
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
  schema,
}) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "NoteUser",
      interfaces: ["Node"],
      fields: {
        userId: {
          type: "String!",
          resolve: (source: NoteUserNodeSource) => source.userId.toString(),
        },
      },
    }),
    schema.buildObjectType({
      name: "NoteContent",
      interfaces: ["Node"],
      fields: {
        noteId: {
          type: "String!",
          resolve: (source: NoteContentNodeSource) => source.noteId.toString(),
        },
      },
    }),
    schema.buildObjectType({
      name: "NoteTextNote",
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
      fields: {
        noteId: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.noteId.toString(),
        },
        noteKey: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.key,
        },
        userId: {
          type: "Int!",
          resolve: (source: NoteTextNoteNodeSource) => source.user_id,
        },
        readingUuid: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.reading_uuid,
        },
        name: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.name,
        },
        bodyHtml: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.body,
        },
        eyecatch: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.eyecatch,
        },
        author: {
          type: "NoteUser!",
          resolve(source: NoteTextNoteNodeSource, _args, context) {
            return context.nodeModel.findOne({
              type: "NoteUser",
              query: {
                filter: {
                  userId: {
                    eq: source.user_id.toString(),
                  },
                },
              },
            });
          },
        },
        hashtags: {
          type: "[NoteTextNoteHashtag!]!",
          resolve: (source: NoteTextNoteNodeSource) => source.hashtag_notes,
        },
        pictures: {
          type: "[NoteTextNotePicture!]!",
          resolve: (source: NoteTextNoteNodeSource) => source.pictures,
        },
        embeddedContents: {
          type: "[NoteTextNoteEmbeddedContent!]!",
          resolve: (source: NoteTextNoteNodeSource) => source.embedded_contents,
        },
        likeCount: {
          type: "Int!",
          resolve: (source: NoteTextNoteNodeSource) => source.like_count,
        },
        anonymousLikeCount: {
          type: "Int!",
          resolve: (source: NoteTextNoteNodeSource) => source.anonymous_like_count,
        },
        commentCount: {
          type: "Int!",
          resolve: (source: NoteTextNoteNodeSource) => source.comment_count,
        },
        tweetText: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.tweet_text,
        },
        publishedAt: {
          type: "Date!",
          resolve: (source: NoteTextNoteNodeSource) => new Date(source.publish_at),
        },
        noteUrl: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.note_url,
        },
        noteShareUrl: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.note_share_url,
        },
        twitterShareUrl: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.twitter_share_url,
        },
        facebookShareUrl: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.facebook_share_url,
        },
        lineShareUrl: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.line_share_url,
        },
        popularSiblingNotes: {
          type: "[NoteTextNote!]!",
          async resolve(source: NoteTextNoteNodeSource, _args, context) {
            const { entries } = await context.nodeModel.findAll({
              type: "NoteTextNote",
              query: {
                filter: {
                  noteId: {
                    in: source.popular_sibling_notes.map((note) => note.id.toString()),
                  },
                },
              },
            });
            return entries;
          },
        },
        prevNote: {
          type: "NoteTextNote",
          resolve(source: NoteTextNoteNodeSource, _args, context) {
            return context.nodeModel.findOne({
              type: "NoteTextNote",
              query: {
                filter: {
                  noteId: {
                    eq: source.prev_note?.id.toString() ?? null,
                  },
                },
              },
            });
          },
        },
        nextNote: {
          type: "NoteTextNote",
          resolve(source: NoteTextNoteNodeSource, _args, context) {
            return context.nodeModel.findOne({
              type: "NoteTextNote",
              query: {
                filter: {
                  noteId: {
                    eq: source.next_note?.id.toString() ?? null,
                  },
                },
              },
            });
          },
        },
      },
    }),
    schema.buildObjectType({
      name: "NoteTextNotePicture",
      extensions: {
        infer: false,
      },
      fields: {
        key: {
          type: "String!",
          resolve: (source: Picture) => source.key,
        },
        url: {
          type: "String!",
          resolve: (source: Picture) => source.url,
        },
        thumbnailUrl: {
          type: "String!",
          resolve: (source: Picture) => source.thumbnail_url,
        },
        alt: {
          type: "String!",
          resolve: (source: Picture) => source.alt,
        },
        caption: {
          type: "String",
          resolve: (source: Picture) => source.caption,
        },
        width: {
          type: "Int",
          resolve: (source: Picture) => source.width,
        },
        height: {
          type: "Int",
          resolve: (source: Picture) => source.height,
        },
      },
    }),
    schema.buildObjectType({
      name: "NoteTextNoteEmbeddedContent",
      extensions: {
        infer: false,
      },
      fields: {
        key: {
          type: "String!",
          resolve: (source: EmbeddedContent) => source.key,
        },
        url: {
          type: "String!",
          resolve: (source: EmbeddedContent) => source.url,
        },
        embedHtml: {
          type: "String",
          resolve: (source: EmbeddedContent) => source.html_for_embed,
        },
        displayHtml: {
          type: "String",
          resolve: (source: EmbeddedContent) => source.html_for_display,
        },
        embeddableType: {
          type: "String!",
          resolve: (source: EmbeddedContent) => source.embeddable_type,
        },
        service: {
          type: "String!",
          resolve: (source: EmbeddedContent) => source.service,
        },
        identifier: {
          type: "String",
          resolve: (source: EmbeddedContent) => source.identifier,
        },
        caption: {
          type: "String",
          resolve: (source: EmbeddedContent) => source.caption,
        },
        createdAt: {
          type: "Date!",
          resolve: (source: EmbeddedContent) => source.created_at,
        },
      },
    }),
    schema.buildObjectType({
      name: "NoteTextNoteHashtag",
      extensions: {
        infer: false,
      },
      fields: {
        id: {
          type: "String!",
          resolve: (source: HashtagNote) => source.id.toString(),
        },
        createdAt: {
          type: "Date!",
          resolve: (source: HashtagNote) => new Date(source.created_at),
        },
        name: {
          type: "String!",
          resolve: (source: HashtagNote) => source.hashtag.name,
        },
      },
    }),
  ]);
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  { actions, createNodeId, createContentDigest },
  options,
) => {
  const { creator } = options as unknown as PluginOptions;

  const { createNode } = actions;
  const client = makeNoteApiClient();

  const user = await client.getUser(creator);
  const contents = await client.getAllUserContents(creator);
  const notes = await Promise.all(
    contents.map((content) => {
      return client.getNote(content.key);
    }),
  );

  const userNode: NodeInput & NoteUserNodeSource = {
    ...user,
    userId: user.id,
    id: createNodeId(`NoteUser-${user.id}`),
    parent: null,
    children: [],
    internal: {
      type: "NoteUser",
      contentDigest: createContentDigest(user),
    },
  };

  createNode(userNode);

  const textNoteNodes: Array<NodeInput & NoteTextNoteNodeSource> = notes.map((note) => ({
    ...note,
    noteId: note.id,
    id: createNodeId(`NoteTextNote-${note.id}`),
    parent: null,
    children: [],
    internal: {
      type: "NoteTextNote",
      contentDigest: createContentDigest(note),
    },
  }));

  for (const textNoteNode of textNoteNodes) {
    createNode(textNoteNode);
  }

  const contentNodes: Array<NodeInput & NoteContentNodeSource> = contents.map((content) => ({
    ...content,
    noteId: content.id,
    id: createNodeId(`NoteContent-${content.id}`),
    parent: null,
    children: [],
    internal: {
      type: "NoteContent",
      contentDigest: createContentDigest(content),
    },
  }));

  for (const contentNode of contentNodes) {
    createNode(contentNode);
  }
};
