import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { cva, type VariantProps } from "class-variance-authority";

// const tableCellVariants = cva(``, {
//   variants: {
//     tableHeadVariat: {
//       default: "",
//       filled: "bg-gray-200 py-6 border-4 border-gray-100",
//     },
//     tableCellVariant: {
//       default: "",
//       borders: "py-6 border-4 border-gray-100",
//     },
//   },
//   defaultVariants: {
//     tableHeadVariat: "default",
//     tableCellVariant: "default",
//   },
// });

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataPagination } from "../data-pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage?: number; // 1-based
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
  visiblePages?: number;
  tabelHeadClassName?: string;
  tabelCellClassName?: string;
}

export function DataTableRowSpan<TData extends Record<string, any>, TValue>({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  visiblePages,
  tabelHeadClassName,
  tabelCellClassName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const useExternal = onPageChange && currentPage != null && totalPages != null;

  return (
    <div className="w-full">
      <Table className="rounded-2xl bg-white py-2">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  rowSpan={header.rowSpan}
                  className={cn("py-6", tabelHeadClassName)}
                  // className="bg-gray-200 py-6 border-4 border-gray-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const original = row.original as any;
              const cells = row.getVisibleCells().flatMap((cell) => {
                // Skip duplicate index/objectName cells
                if (
                  (cell.column.id === "index" && original.index === "") ||
                  (cell.column.id === "objectName" &&
                    original.objectName === "")
                ) {
                  return [];
                }
                const span =
                  cell.column.id === "index" || cell.column.id === "objectName"
                    ? original.rowSpan
                    : undefined;
                return [
                  <TableCell
                    key={cell.id}
                    rowSpan={span}
                    className={cn("py-6", tabelCellClassName)}
                    // "py-6 border-4 border-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>,
                ];
              });
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {cells}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="py-4">
        {useExternal ? (
          <DataPagination
            currentPage={currentPage!}
            totalPages={totalPages!}
            visiblePages={visiblePages}
            onPageChange={onPageChange!}
          />
        ) : (
          <DataTablePagination table={table} />
        )}
      </div>
    </div>
  );
}
