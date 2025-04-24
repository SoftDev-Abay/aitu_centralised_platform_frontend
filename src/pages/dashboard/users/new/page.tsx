// UserCreatePage.tsx
import { useCreateUserMutation } from "@/features/users/usersApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type User = {
  created_at: string;
  disabled: true;
  id: number;
  role_id: number;
  updated_at: string;
  username: string;
  uuid: string;
};

export default function UserCreatePage() {
  const [username, setUsername] = useState("");
  const [roleId, setRoleId] = useState<number>();
  const [disabled, setDisabled] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createUser({ username, role_id: roleId, disabled }).unwrap();
      navigate("/dashboard/users");
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create User</h1>
      <Card className="space-y-4 p-6">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Role ID"
          type="number"
          value={roleId}
          onChange={(e) =>
            setRoleId(e.target.value ? parseInt(e.target.value) : 0)
          }
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={disabled}
            onCheckedChange={(checked) => setDisabled(!!checked)}
          />
          <label>Disabled</label>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </Card>
    </div>
  );
}
