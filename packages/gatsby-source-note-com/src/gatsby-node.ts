import { type GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
  const gql = String.raw;
  actions.createTypes(gql`
    type NoteUser implements Node {
      noteId: String!
      noteKey: String!
      noteUrl: URL!
    }

    type NoteCategory implements Node {
      noteId: String!
      name: String!
      engName: String!
    }

    type NoteTextNote implements Node {
      noteId: String!
      noteKey: String!
      noteUrl: URL!
      name: String!
      summary: String!
      bodyHtml: String!
      likeCount: Int!
      publishedAt: Date! @dateformat(formatString: "YYYY-MM-DD")
      hashtags: [String!]!
      categories: [NoteCategory!]!
      authors: [NoteUser!]!
      eyecatchImageUrl: URL!
      noteShareUrl: URL!
      twitterShareUrl: URL!
      facebookShareUrl: URL!
    }
  `);
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
}, options) => {
  // TODO
};
