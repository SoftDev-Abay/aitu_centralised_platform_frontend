import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignClubMemberMutation } from "../../clubsApiSlice";
import { clubMemberRolesOptions } from "../../constants";
import { ClubMemberRole, UserDto } from "../../types";
import { Label } from "@/components/ui/label";

interface EditMemberRoleModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  clubId: string;
  member: UserDto;
}

const EditMemberRoleModal = ({
  open,
  onOpenChange,
  clubId,
  member,
}: EditMemberRoleModalProps) => {
  const [role, setRole] = useState<ClubMemberRole>(member.role);
  const [assignRole, { isLoading }] = useAssignClubMemberMutation();

  const handleRoleChange = (value: string) => {
    setRole(value as ClubMemberRole);
  };

  const handleSave = async () => {
    if (!clubId || !member.id) return;

    try {
      await assignRole({
        clubId,
        userId: member.id.toString(),
        role,
      }).unwrap();
      toast.success("Member role updated!");
      onOpenChange(false);
    } catch {
      toast.error("Failed to update member role");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Member Role</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              Editing role for:{" "}
              <span className="font-medium">
                {member.firstName} {member.lastName}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {clubMemberRolesOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberRoleModal;