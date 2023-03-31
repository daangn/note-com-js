import type { CustomDomain, Like, HashtagNote, Picture } from ".";

export type Contents = {
  contents: Content[];
  isLastPage: boolean;
  totalCount: number;
};

export type Content = {
  id: number;
  type: string;
  status: string;
  name: string;
  description: string | null;
  key: string;
  body: string;
  likeCount: number;
  price: number;
  slug: string;
  publishAt: string;
  thumbnailExternalUrl: string;
  eyecatch: string;
  user: ContentUser;
  canRead: boolean;
  isAuthor: boolean;
  externalUrl: string | null;
  customDomain: string | null;
  separator: string | null;
  isLimited: boolean;
  isTrial: boolean;
  canUpdate: boolean;
  tweetText: string | null;
  isRefund: boolean;
  isLiked: boolean;
  commentCount: number;
  likes: Like[];
  anonymousLikeCount: number;
  disableComment: boolean;
  hashtags: HashtagNote[];
  twitterShareUrl: string | null;
  facebookShareUrl: string | null;
  lineShareUrl: string | null;
  audio: Audio;
  pictures: Picture[];
  limitedMessage: Message | null;
  labels: Label[];
  priorSale: string | null;
  canMultipleLimitedNote: boolean;
  isMembershipConnected: boolean;
  hasAvailableCirclePlans: boolean;
  isPinned: boolean;
  pinnedUserNoteId: number | null;
  spEyecatch: string;
  enableBacktoDraft: boolean;
  notificationMessages: Message[];
  isProfiled: boolean;
  isForWork: boolean;
  isCircleDescription: boolean;
  noteDraft: string | null;
  noteUrl: string;
  imageCount: number;
  format: string;
  capabilities: Capabilities;
};

export type ContentUser = {
  id: number;
  key: string;
  name: string;
  urlname: string;
  nickname: string;
  userProfileImagePath: string;
  customDomain: CustomDomain | null;
  disableSupport: boolean;
  disableGuestPurchase: boolean;
  emailConfirmedFlag: boolean;
  likeAppealText: string | null;
  likeAppealImage: string | null;
  purchaseAppealTextNote: string | null;
  twitterNickname: string;
  shareAppeal: Appeal;
  magazineAddApeal: Appeal;
};

export type Appeal = {
  text: string | null;
  image: string | null;
};

export type Audio = {};
export type Label = {};
export type Message = {};

export type Capabilities = {
  rubyText: boolean;
  formulaText: boolean;
  duplication: boolean;
};
