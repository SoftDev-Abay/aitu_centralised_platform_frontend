export type PostDto = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  likeCount: number;
  userId: number;
};

export type PostCreateDto = {
  title: string;
  description: string;
  imageId: string;
};

export type PostIdParam = { id: string };

export type PaginatedPostsResponse = {
  count: number;
  limit: number;
  posts: PostDto[];
};
