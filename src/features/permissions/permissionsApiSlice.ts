import { apiSlice } from "@/app/api/apiSlice";
import { Permission } from "./types";
import {
  setPermissions,
  upsertPermission,
  removePermission,
} from "./permissionsSlice";

// Updated to support pagination
export type PaginatedPermissionsResponse = {
  count: number;
  limit: number;
  permissions: Permission[];
};

export const permissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /permissions with pagination
    getPermissions: builder.query<
      PaginatedPermissionsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/permissions",
        method: "GET",
        params: { page, pageSize: limit },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("permissions", data.permissions)

          dispatch(setPermissions(data.permissions));
        } catch (err) {
          console.error("Failed to fetch permissions:", err);
        }
      },
    }),

    // POST /permission
    createPermission: builder.mutation<
      { permission: Permission },
      Partial<Permission>
    >({
      query: (newPermission) => ({
        url: "/permission",
        method: "POST",
        body: newPermission,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertPermission(data.permission));
        } catch (e) {
          console.error("Failed to create permission", e);
        }
      },
    }),

    // PUT /permission
    updatePermission: builder.mutation<
      { permission: Permission },
      Partial<Permission>
    >({
      query: (updatedPermission) => ({
        url: "/permission",
        method: "PUT",
        body: updatedPermission,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertPermission(data.permission));
        } catch (e) {
          console.error("Failed to update permission", e);
        }
      },
    }),

    // DELETE /permission
    deletePermission: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: "/permission",
        method: "DELETE",
        params: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removePermission(id));
        } catch (e) {
          console.error("Failed to delete permission", e);
        }
      },
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionsApiSlice;
