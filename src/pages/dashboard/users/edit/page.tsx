import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "@/features/users/usersApiSlice";
import { selectUserById } from "@/features/users/usersSlice";
import { RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);

  // Select user from Redux store
  const user = useSelector((state: RootState) => selectUserById(state, userId));

  // Local form state
  const [username, setUsername] = useState("");
  const [roleId, setRoleId] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Initialize form when user data arrives
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRoleId(user.role_id);
      setDisabled(user.disabled);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      await updateUser({
        id: userId,
        username,
        role_id: roleId,
        disabled,
      }).unwrap();
      navigate("/dashboard/users");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) return <div className="p-6">User not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
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
            setRoleId(e.target.value ? parseInt(e.target.value, 10) : 0)
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
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </div>
  );
}
