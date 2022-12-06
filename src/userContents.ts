export type Root = {
  data: Data,
};

export type Data = {
  contents: Content[],
  isLastPage: boolean,
  totalCount: number,
};

export type Content = {
  key: string
};
