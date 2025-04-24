import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { RootState } from "../../app/store";
import { Table, Row } from "./types";

const tablesAdapter = createEntityAdapter<Table, number>({
  selectId: (table) => table.id,
});
const initialState = tablesAdapter.getInitialState();

export const tablesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<EntityState<Table, number>, void>({
      query: () => ({
        url: "/tables",
        method: "GET",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (responseData: Table[]) => {
        return tablesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Table" as const, id: "LIST" },
              ...result.ids.map((id) => ({ type: "Table" as const, id })),
            ]
          : [{ type: "Table" as const, id: "LIST" }],
    }),

    createTable: builder.mutation<Table, { table_name: string }>({
      query: (tableData) => ({
        url: "/tables",
        method: "POST",
        body: tableData,
      }),
      invalidatesTags: [{ type: "Table", id: "LIST" }],
    }),

    addRowToTable: builder.mutation<
      Row,
      { tableId: number; rowData: Record<string, any> }
    >({
      query: ({ tableId, rowData }) => ({
        url: `/tables/${tableId}/rows`,
        method: "POST",
        body: rowData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Table" as const, id: arg.tableId },
      ],
    }),

    getRowsByTableId: builder.query<Row[], number>({
      query: (tableId) => ({
        url: `/tables/${tableId}/rows`,
        method: "GET",
      }),
      providesTags: (result, error, tableId) => [
        { type: "Table" as const, id: tableId },
      ],
    }),

    updateRow: builder.mutation<
      Row,
      { tableId: number; rowId: number; updateData: Record<string, any> }
    >({
      query: ({ tableId, rowId, updateData }) => ({
        url: `/tables/${tableId}/rows/${rowId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Table" as const, id: arg.tableId },
      ],
    }),

    deleteRow: builder.mutation<void, { tableId: number; rowId: number }>({
      query: ({ tableId, rowId }) => ({
        url: `/tables/${tableId}/rows/${rowId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Table" as const, id: arg.tableId },
      ],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useAddRowToTableMutation,
  useGetRowsByTableIdQuery,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = tablesApiSlice;

export const selectTablesResult = tablesApiSlice.endpoints.getTables.select();
const selectTablesData = createSelector(
  selectTablesResult,
  (tablesResult) => tablesResult.data ?? initialState
);

export const {
  selectAll: selectAllTables,
  selectById: selectTableById,
  selectIds: selectTableIds,
} = tablesAdapter.getSelectors(
  (state: RootState) => selectTablesData(state) ?? initialState
);
