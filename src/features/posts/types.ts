export enum PostCategories {
  TECHNOLOGY = "TECHNOLOGY",
  SCIENCE = "SCIENCE",
  ART = "ART",
  MUSIC = "MUSIC",
  SPORTS = "SPORTS",
  OTHER = "OTHER",
}

export interface PostDto {
  id: string;
  title: string;
  description?: string;
  category?: PostCategories;
  images?: string[];
  likeCount?: number;
  dislikeCount?: number;
  userId?: number;
  createdAt: string;
  commentCount?: number;
}

export interface PostCreateDto {
  title: string;
  description?: string;
  category?: string;
  images?: string[];
}

export interface PostUpdateDto {
  title?: string;
  description?: string;
  category?: string;
  images?: string[];
}

export interface PostIdParam {
  id: string;
}

export interface PaginatedPostsResponse {
  count: number;
  data: PostDto[];
}

export interface CommentCreateDto {
  content: string;
  postId: string;
}

export interface CommentDto {
  id: string;
  content: string;
  userId: number;
  postId: string;
  createdAt: string;
}
