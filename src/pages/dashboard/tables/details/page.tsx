import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetRowsByTableIdQuery,
  useAddRowToTableMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} from "@/features/tables/tablesApiSlice";
import { Row } from "@/features/tables/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditRowModal from "@/features/tables/EditRowModal";
import CreateRowModal from "@/features/tables/CreateRowModal";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { truncateText } from "@/lib/helpers";
import ConfirmModal from "@/components/ui/confirm-modal";
import toast from "react-hot-toast";

export default function TableDetailsPage() {
  const { tableId } = useParams<{ tableId: string }>();
  const {
    data: rows,
    isLoading,
    isError,
  } = useGetRowsByTableIdQuery(Number(tableId));
  const [addRow] = useAddRowToTableMutation();
  const [updateRow] = useUpdateRowMutation();
  const [deleteRow] = useDeleteRowMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [deleteConfirmRowId, setDeleteConfirmRowId] = useState<number | null>(
    null
  );

  const handleRowClick = (row: Row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const handleAddRow = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSave = async (newData: Record<string, any>) => {
    try {
      await addRow({ tableId: Number(tableId), rowData: newData }).unwrap();
      setIsCreateModalOpen(false);
      toast.success("Row created successfully");
    } catch (error) {
      toast.error("Failed to create row");
    }
  };

  const handleEditSave = async (updatedData: Record<string, any>) => {
    if (selectedRow?.id) {
      try {
        await updateRow({
          tableId: Number(tableId),
          rowId: selectedRow.id,
          updateData: updatedData,
        }).unwrap();
        setIsEditModalOpen(false);
        toast.success("Row updated successfully");
      } catch (error) {
        toast.error("Failed to update row");
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmRowId !== null) {
      try {
        await deleteRow({
          tableId: Number(tableId),
          rowId: deleteConfirmRowId,
        }).unwrap();
        setDeleteConfirmRowId(null);
        toast.success("Row deleted successfully");
      } catch (error) {
        toast.error("Failed to delete row");
      }
    }
  };

  const handleDeleteInPlace = async (id: number) => {
    try {
      await deleteRow({ tableId: Number(tableId), rowId: id }).unwrap();
      toast.success("Row deleted successfully");
    } catch (error) {
      toast.error("Failed to delete row");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Table Details</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : !isError ? (
        <div className="space-y-4">
          <Card className="px-4 pt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Created_at</TableHead>
                  <TableHead>Updated_at</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={JSON.stringify(row.data)}
                    >
                      {truncateText(JSON.stringify(row.data))}
                    </TableCell>
                    <TableCell>
                      {new Date(row.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(row.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="flex gap-2"
                    >
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmRowId(row.id);
                        }}
                        variant={"destructive"}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(row);
                        }}
                        variant={"default"}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Button onClick={handleAddRow}>Add Row</Button>
        </div>
      ) : (
        <div>Error loading table data.</div>
      )}
      {isCreateModalOpen && (
        <CreateRowModal
          isOpen={isCreateModalOpen}
          table_id={Number(tableId)}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateSave}
        />
      )}
      {isEditModalOpen && selectedRow && (
        <EditRowModal
          isOpen={isEditModalOpen}
          id={selectedRow.id}
          table_id={selectedRow.table_id}
          rowData={selectedRow.data}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
          onDelete={() => {
            setDeleteConfirmRowId(selectedRow.id);
            setIsEditModalOpen(false);
          }}
        />
      )}
      {deleteConfirmRowId !== null && (
        <ConfirmModal
          isOpen={deleteConfirmRowId !== null}
          title="Confirm Deletion"
          description="Are you sure you want to delete this row?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirmRowId(null)}
        />
      )}
    </div>
  );
}
