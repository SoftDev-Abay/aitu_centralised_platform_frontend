// features/departments/departmentsApiSlice.ts
import { apiSlice } from "@/app/api/apiSlice";
import { Department } from "./types";
import { User } from "../users/types";

export type PaginatedDepartmentsResponse = {
  count: number;
  limit: number;
  departments: Department[];
};

export type DepartmentUsersResponse = {
  count: number;
  limit: number;
  users: User[];
};

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /departments?page=&pageSize=
    getDepartments: builder.query<
      PaginatedDepartmentsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/departments",
        method: "GET",
        params: { page, pageSize: limit },
      }),
      providesTags: (result) =>
        result
          ? [
              // for invalidation after create/delete
              { type: "Department" as const, id: "LIST" },
              // individual-dept cache tags
              ...result.departments.map((d) => ({
                type: "Department" as const,
                id: d.id,
              })),
            ]
          : [{ type: "Department" as const, id: "LIST" }],
    }),

    // GET /departments/:id
    getDepartment: builder.query<Department, number>({
      query: (id) => ({
        url: `/departments/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Department", id }],
    }),

    // POST /departments
    createDepartment: builder.mutation<Department, Partial<Department>>({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    // PUT /departments/:id
    updateDepartment: builder.mutation<Department, Partial<Department>>({
      query: ({ id, ...patch }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Department", id: result.id }] : [],
    }),

    // DELETE /departments/:id
    deleteDepartment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    // GET /departments/:departmentID/users?page=&pageSize=
    getDepartmentUsers: builder.query<
      DepartmentUsersResponse,
      { departmentID: number; page?: number; limit?: number }
    >({
      query: ({ departmentID, page = 1, limit = 10 }) => ({
        url: `/departments/${departmentID}/users`,
        method: "GET",
        params: { page, pageSize: limit },
      }),
      providesTags: (result, _error, { departmentID }) =>
        result
          ? [
              { type: "DepartmentUsers" as const, id: departmentID },
              ...result.users.map((u) => ({
                type: "DepartmentUser" as const,
                id: u.id,
              })),
            ]
          : [{ type: "DepartmentUsers", id: departmentID }],
    }),

    // POST /departments/:departmentID/users/:userID
    addUserToDepartment: builder.mutation<
      void,
      { departmentID: number; userID: number }
    >({
      query: ({ departmentID, userID }) => ({
        url: `/departments/${departmentID}/users/${userID}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { departmentID }) => [
        { type: "DepartmentUsers", id: departmentID },
      ],
    }),

    // DELETE /departments/:departmentID/users/:userID
    removeUserFromDepartment: builder.mutation<
      void,
      { departmentID: number; userID: number }
    >({
      query: ({ departmentID, userID }) => ({
        url: `/departments/${departmentID}/users/${userID}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { departmentID }) => [
        { type: "DepartmentUsers", id: departmentID },
      ],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentUsersQuery,
  useAddUserToDepartmentMutation,
  useRemoveUserFromDepartmentMutation,
} = departmentsApiSlice;
