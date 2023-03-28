import type { NodeInput, GatsbyNode } from "gatsby";
import { makeNoteApiClient } from "note-com-js";

import type { NoteUserNodeSource, NoteTextNoteNodeSource, PluginOptions } from "./types";

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
        title: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.name,
        },
        bodyHtml: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.body,
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
        publishedAt: {
          type: "Date!",
          resolve: (source: NoteTextNoteNodeSource) => new Date(source.publish_at),
        },
        eyecatchImageUrl: {
          type: "String!",
          resolve: (source: NoteTextNoteNodeSource) => source.eyecatch,
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
  const contents = await Promise.all(
    (
      await client.getUserContents(creator)
    ).contents.map((content) => {
      return client.getNoteText(content.key);
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

  const contentsNodes: Array<NodeInput & NoteTextNoteNodeSource> = contents.map((content) => ({
    ...content,
    noteId: content.id,
    id: createNodeId(`NoteTextNote-${content.id}`),
    parent: null,
    children: [],
    internal: {
      type: "NoteTextNote",
      contentDigest: createContentDigest(content),
    },
  }));

  for (const contentsNode of contentsNodes) {
    createNode(contentsNode);
  }
};
