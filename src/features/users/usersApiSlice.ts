import { apiSlice } from "@/app/api/apiSlice";
import {
  UserDto,
  UsersClubDto,
  GetUserByIdParams,
  GetUserByEmailParams,
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

    getUserByEmail: builder.query<UserDto, GetUserByEmailParams>({
      query: ({ email }) => ({
        url: `/users/by-email`,
        method: "GET",
        params: { email },
      }),
    }),

    getUserAndClubs: builder.query<UsersClubDto, void>({
      query: () => ({
        url: "/users/visitor",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useGetUserAndClubsQuery,
} = usersApiSlice;
