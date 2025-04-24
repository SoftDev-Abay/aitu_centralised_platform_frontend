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

interface CreateRowModalProps {
  isOpen: boolean;
  table_id: number;
  onClose: () => void;
  onSave: (newData: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

export default function CreateRowModal({
  isOpen,
  table_id,
  onClose,
  onSave,
  initialData = { key: "value" },
}: CreateRowModalProps) {
  const [data, setData] = useState<Record<string, any>>(initialData);

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

  const handleDelete = (del: InteractionProps) => {
    setData(del.updated_src);
    return del.updated_src;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Row</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 h-[400px] overflow-auto">
          <ReactJson
            src={data}
            onEdit={handleEdit}
            onAdd={handleAdd}
            onDelete={handleDelete}
            name={false}
            collapsed={false}
            enableClipboard={true}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
