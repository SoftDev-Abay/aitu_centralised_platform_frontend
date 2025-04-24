import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ReactJson, { InteractionProps } from "react-json-view";

interface EditRowModalProps {
  isOpen: boolean;
  id: number;
  table_id: number;
  onClose: () => void;
  rowData: Record<string, any>;
  onSave: (updatedData: Record<string, any>) => void;
  onDelete: () => void;
}

export default function EditRowModal({
  isOpen,
  id,
  table_id,
  onClose,
  rowData,
  onSave,
  onDelete,
}: EditRowModalProps) {
  const [data, setData] = useState<Record<string, any>>(rowData);

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const handleSave = () => {
    onSave(data);
    onClose();
  };

  const handleEdit = (edit: InteractionProps) => {
    setData(edit.updated_src);
    return edit.updated_src;
  };

  const handleAdd = (add: InteractionProps) => {
    setData(add.updated_src);
    return add.updated_src;
  };

  const handleDeleteField = (del: InteractionProps) => {
    setData(del.updated_src);
    return del.updated_src;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Row</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 h-[400px] overflow-auto">
          <ReactJson
            src={data}
            onEdit={handleEdit}
            onAdd={handleAdd}
            onDelete={handleDeleteField}
            name={false}
            collapsed={false}
            enableClipboard={true}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
