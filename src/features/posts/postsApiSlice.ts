import { apiSlice } from "@/app/api/apiSlice";
import {
  PostDto,
  PostCreateDto,
  PostIdParam,
  PostUpdateDto,
  PaginatedPostsResponse,
  CommentDto,
  CommentCreateDto,
} from "./types";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetching posts with pagination
    getPosts: builder.query<
      PaginatedPostsResponse,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 0, pageSize = 10 }) => ({
        url: "/posts",
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.data.map((post) => ({
                type: "Post" as const,
                id: post.id,
              })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    // Get a specific post by its ID
    getPostById: builder.query<PostDto, PostIdParam>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Post", id }],
    }),

    // Create a new post
    createPost: builder.mutation<PostDto, PostCreateDto>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    // Update an existing post
    updatePost: builder.mutation<PostDto, { id: string; body: PostUpdateDto }>({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),

    // Delete a post by its ID
    deletePost: builder.mutation<void, PostIdParam>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),

    // Search posts
    searchPosts: builder.query<
      PaginatedPostsResponse,
      {
        title?: string;
        description?: string;
        category?: string;
        page?: number;
        pageSize?: number;
      }
    >({
      query: ({ title, description, category, page = 0, pageSize = 10 }) => ({
        url: "/posts/search",
        method: "GET",
        params: { title, description, category, page, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.data.map((post) => ({
                type: "Post" as const,
                id: post.id,
              })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    // Get comments for a specific post
    getCommentsByPostId: builder.query<CommentDto[], string>({
      query: (postId) => ({
        url: `/posts/comments/by-post/${postId}`,
        method: "GET",
      }),
      providesTags: (result, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comment" as const, id })),
              { type: "Comment", id: `POST_${postId}` },
            ]
          : [{ type: "Comment", id: `POST_${postId}` }],
    }),

    // Add a comment to a post
    addCommentToPost: builder.mutation<CommentDto, CommentCreateDto>({
      query: (body) => ({
        url: "/posts/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { postId }) => [
        { type: "Comment", id: `POST_${postId}` },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useSearchPostsQuery,
  useGetCommentsByPostIdQuery,
  useAddCommentToPostMutation,
} = postsApiSlice;
