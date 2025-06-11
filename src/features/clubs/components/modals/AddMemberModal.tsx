import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllUsersQuery } from "@/features/users/usersApiSlice";
import { useAssignClubMemberMutation } from "../../clubsApiSlice";
import { clubMemberRolesOptions } from "../../constants";
import { ClubMemberRole } from "../../types";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  clubId: string;
}

const AddMemberModal = ({
  open,
  onOpenChange,
  clubId,
}: AddMemberModalProps) => {
  // const [addMember, { isLoading }] = useAddClubMemberMutation();
  const { data: users } = useGetAllUsersQuery();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [role, setRole] = useState<ClubMemberRole>(ClubMemberRole.MEMBER);

  const [assignRole, { isLoading: _ }] = useAssignClubMemberMutation();

  const handleAddMember = async () => {
    if (!clubId || !selectedUserId) return;

    try {
      await assignRole({ clubId, userId: selectedUserId, role }).unwrap();
      toast.success("Member added!");
      onOpenChange(false);
    } catch {
      toast.error("Failed to add member");
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as ClubMemberRole);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="memberId">Student</Label>
            <Select onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.firstName} {user.lastName} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {clubMemberRolesOptions.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
                {/* <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="vice_president">Vice President</SelectItem>
                <SelectItem value="predident">President</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAddMember}>{"Add Member"}</Button>
          {/* <Button onClick={handleAddMember} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Member"}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
