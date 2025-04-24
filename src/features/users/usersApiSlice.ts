import { apiSlice } from "@/app/api/apiSlice";
import { User } from "./types";
import {
  setUsers,
  upsertUser,
  removeUser,
} from "./usersSlice";

// Updated to support pagination
export type PaginatedUsersResponse = {
  count: number;
  limit: number;
  users: User[];
};

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /users with pagination
    getUsers: builder.query<
      PaginatedUsersResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/users",
        method: "GET",
        params: { page, pageSize: limit },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("users", data.users)

          dispatch(setUsers(data.users));
        } catch (err) {
          console.error("Failed to fetch users:", err);
        }
      },
    }),

    // POST /user
    createUser: builder.mutation<
      { user: User },
      Partial<User>
    >({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertUser(data.user));
        } catch (e) {
          console.error("Failed to create user", e);
        }
      },
    }),

    // PUT /user
    updateUser: builder.mutation<
      { user: User },
      Partial<User>
    >({
      query: (updatedUser) => ({
        url: "/user",
        method: "PUT",
        body: updatedUser,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertUser(data.user));
        } catch (e) {
          console.error("Failed to update user", e);
        }
      },
    }),

    // DELETE /user
    deleteUser: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: "/user",
        method: "DELETE",
        params: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeUser(id));
        } catch (e) {
          console.error("Failed to delete user", e);
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
