import { apiSlice } from "@/app/api/apiSlice";
import { ProtectedObject } from "./types";
import { removeObject, setObjects, upsertObject } from "./objectsSlice";

type PaginatedObjectsResponse = {
  count: number;
  limit: number;
  objects: ProtectedObject[];
};

export const objectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getObjects: builder.query<
      PaginatedObjectsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 0, limit = 10 }) => ({
        url: "/object",
        method: "GET",
        params: { page, pageSize: limit },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setObjects(data.objects));
        } catch (err) {
          console.error("Failed to fetch objects:", err);
        }
      },
    }),

    createObject: builder.mutation<
      { object: ProtectedObject },
      Partial<ProtectedObject>
    >({
      query: (body) => ({
        url: "/object",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(upsertObject(data.object)); // ✅ updates normalized store
        } catch {}
      },
    }),

    updateObject: builder.mutation<
      { object: ProtectedObject },
      Partial<ProtectedObject>
    >({
      query: (body) => ({
        url: "/object",
        method: "PUT",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(upsertObject(data.object)); // ✅ updates normalized store
        } catch {}
      },
      invalidatesTags: (result, error, arg) =>
        result?.object.id ? [{ type: "Object", id: result.object.id }] : [],
    }),

    deleteObject: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: "/object",
        method: "DELETE",
        params: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeObject(id)); // ✅ Remove from normalized store
        } catch (e) {
          console.error("Failed to delete", e);
        }
      },
    })
  }),
});

export const {
  useGetObjectsQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
  useDeleteObjectMutation,
} = objectsApiSlice;
