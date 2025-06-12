import { apiSlice } from "@/app/api/apiSlice";
import {
  UserDto,
  GetUserByIdParams,
  GetUserByEmailParams,
  UserVisitorDto,
} from "./types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserDto[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    createUser: builder.mutation<UserDto, UserDto>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),

    getUserById: builder.query<UserDto, GetUserByIdParams>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    // In usersApiSlice.ts
    getUserVisitor: builder.query<UserVisitorDto, void>({
      query: () => ({
        url: `/users/visitor`,
        method: "GET",
        providesTags: ["User"],
      }),
    }),

    getUserByEmail: builder.query<UserDto, GetUserByEmailParams>({
      query: ({ email }) => ({
        url: `/users/by-email`,
        method: "GET",
        params: { email },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useGetUserVisitorQuery,
  useLazyGetUserVisitorQuery,
} = usersApiSlice;
