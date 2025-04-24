import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  actionType: "delete" | "update";
  itemName?: string;
}

const ConfirmActionModal: FC<ConfirmActionModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  actionType,
  itemName,
}) => {
  const title = actionType === "delete" ? "Confirm Deletion" : "Confirm Update";
  const description = `Are you sure you want to ${
    actionType === "delete" ? "delete" : "update"
  } ${itemName ?? "this item"}?`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={actionType === "delete" ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {actionType === "delete" ? "Delete" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmActionModal;
