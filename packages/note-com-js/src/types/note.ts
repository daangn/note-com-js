export type Note = {
  id: number;
  key: string;
  reading_uuid: string;
  like_count: number;
  anonymous_like_count: number;
  comment_count: number;
  tweet_text: string;
  twitter_share_url: string;
  facebook_share_url: string;
  line_share_url: string;
  note_share_url: string;
  note_url: string;
  user: UserLink;
  magazines_for_buy: MagazineLink[];
  magazines_for_subscribe: MagazineLink[];
  reserved_publish_at: number | null;
  content_review_via: string;
  reviewer_count: number;
  content_reviewers: UserLink[];
  slug: string;
  type: "TextNote";
  user_id: number;
  name: string;
  description: "";
  status: "published";
  publish_at: string;
  price: number;
  created_at: string;
  format: "4.0";
  remained_char_num: number;
  remained_image_num: number;
  remained_figure_num: number;
  remained_file_num: number;
  body: string; // html
  eyecatch: string;
  eyecatch_width: number;
  eyecatch_height: number;
  eyecatch_alt: string;
  pictures: Picture[];
  comment_viewable: boolean;
  comments: CommentLink[];
  likes: Like[];
  magazine: MagazineLink;
  magazine_having_count: number;
  belonging_magazine_keys: string[];
  embedded_contents: EmbeddedContent[];
  has_coupon: boolean;
  prev_note: NoteLink | null;
  next_note: NoteLink | null;
  popular_sibling_notes: NoteLink[];
  note_related_notes: NoteLink[];
  related_contests: ContestLink[];
  hashtag_notes: HashtagNote[];
  pinned_user_note_id: number;
  categories: CategoryLink[];
};

export type Picture = {
  caption: string | null;
  key: string;
  url: string;
  thumbnail_url: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export type UserLink = {
  id: number;
  urlname: string;
};

export type CommentLink = {
  id: number;
  key: string;
};

export type Like = {
  id: number;
  created_at: string;
  user_likes: boolean;
  user: UserLink;
};

export type MagazineLink = {
  id: number;
  key: string;
};

export type EmbeddedContent = {
  key: string;
  url: string;
  service: "external-article";
  identifier: string | null;
  embeddable_type: string;
  html_for_display: string | null;
  caption: string | null;
  created_at: string;
  html_for_embed: string | null;
};

export type NoteLink = {
  id: number;
  key: string;
};

export type ContestLink = {
  id: number;
};

export type HashtagNote = {
  id: number;
  created_at: string;
  hashtag: {
    name: string;
  };
};

export type CategoryLink = {
  id: number;
  name: string;
  eng_name: string;
};
