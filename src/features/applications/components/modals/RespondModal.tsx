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
import {
  ClubApplicationRequestResponseDto,
  ClubApplicationResponseStatus,
  ClubApplicationStatus,
} from "../../types";
import { useRespondToApplicationMutation } from "../../applicationRequestsApiSlice";
import { clubApplicationResponseStatusesOptions } from "../../constants";
import { Input } from "@/components/ui/input";

interface RespondModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  requestId: string;
}

const RespondModal = ({ open, onOpenChange, requestId }: RespondModalProps) => {
  const [responseMessage, setResponseMessage] = useState<string | undefined>();
  const [response, setResponse] = useState<ClubApplicationResponseStatus>(
    ClubApplicationResponseStatus.ACCEPTED
  );

  const [respondToApplication, { isLoading }] =
    useRespondToApplicationMutation();

  const handleSubmit = async () => {
    if (!requestId || !response || !responseMessage) return;

    try {
      await respondToApplication({
        requestId,
        response,
        responseMessage,
      }).unwrap();
      toast.success("Member added!");
      onOpenChange(false);
    } catch {
      toast.error("Failed to add member");
    }
  };

  const handleResponseChange = (value: string) => {
    setResponse(value as ClubApplicationResponseStatus);
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
            <Select onValueChange={handleResponseChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {clubApplicationResponseStatusesOptions?.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="Response">Response message</Label>
            <Input
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submiting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RespondModal;
