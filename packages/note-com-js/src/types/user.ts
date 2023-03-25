export type User = {
  id: number;
  key: string;
  nickname: string;
  urlname: string;
  profile: string;
  noteCount: number;
  magazineCount: number;
  followingCount: number;
  followerCount: number;
  originalHeaderImageUrl: string;
  headerImageUrl: string;
  headerImageKey: string;
  profileImageUrl: string;
  profileImageKey: string;
  socials: Socials;
  isOfficial: boolean;
  externalLinks: ExternalLinks;
  hasStore: boolean;
  hasCircle: boolean;
  customDomain: CustomDomain | null;
  style: string;
  proUserId: number | null;
  tlMagazines: unknown[];
  isMedia: boolean;
  storeUrl: string;
  isHavingSubscribableMagazines: boolean;
};

export type Socials = {
  twitter?: Twitter;
};

export type Twitter = {
  id: number;
  nickname: string;
  name: string;
  uid: string;
};

export type ExternalLinks = {
  facebookPageLink?: ExternalLink;
  websiteLink?: ExternalLink;
};

export type ExternalLink = {
  url: string;
};

export type CustomDomain = {
  id: number;
  tls: boolean;
  host: string;
  type: string;
  key: string;
};
