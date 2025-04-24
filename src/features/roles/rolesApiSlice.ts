import { apiSlice } from "@/app/api/apiSlice";
import { Role } from "./types";
import {
  setRoles,
  upsertRole,
  removeRole,
} from "./rolesSlice";

// Updated to support pagination
export type PaginatedRolesResponse = {
  count: number;
  limit: number;
  roles: Role[];
};

export const rolesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /roles with pagination
    getRoles: builder.query<
      PaginatedRolesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/roles",
        method: "GET",
        params: { page, pageSize: limit },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("roles", data.roles)

          dispatch(setRoles(data.roles));
        } catch (err) {
          console.error("Failed to fetch roles:", err);
        }
      },
    }),

    // POST /role
    createRole: builder.mutation<
      { role: Role },
      Partial<Role>
    >({
      query: (newRole) => ({
        url: "/role",
        method: "POST",
        body: newRole,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertRole(data.role));
        } catch (e) {
          console.error("Failed to create role", e);
        }
      },
    }),

    // PUT /role
    updateRole: builder.mutation<
      { role: Role },
      Partial<Role>
    >({
      query: (updatedRole) => ({
        url: "/role",
        method: "PUT",
        body: updatedRole,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertRole(data.role));
        } catch (e) {
          console.error("Failed to update role", e);
        }
      },
    }),

    // DELETE /role
    deleteRole: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: "/role",
        method: "DELETE",
        params: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeRole(id));
        } catch (e) {
          console.error("Failed to delete role", e);
        }
      },
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApiSlice;
