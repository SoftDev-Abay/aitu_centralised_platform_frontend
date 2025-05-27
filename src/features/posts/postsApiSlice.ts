import { apiSlice } from "@/app/api/apiSlice";
import {
  PostDto,
  PostCreateDto,
  PostIdParam,
  PaginatedPostsResponse,
} from "./types";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostDto[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.map((post) => ({ type: "Post" as const, id: post.id })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query<PostDto, PostIdParam>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation<PostDto, PostCreateDto>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

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
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
