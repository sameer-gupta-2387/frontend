export type Photo = {
  id: string;
  title: String;
  url: String;
  thumbnailUrl: String;
};

export type PageLimitPair = {
  page: number;
};

export type PaginationLinks = {
  last: PageLimitPair;
};

export type PhotosPage = {
  data: Photo[];
  links?: PaginationLinks;
};
