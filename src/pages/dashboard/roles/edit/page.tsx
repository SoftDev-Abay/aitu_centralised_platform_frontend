// RoleEditPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useUpdateRoleMutation } from "@/features/roles/rolesApiSlice";
import { selectRoleById } from "@/features/roles/rolesSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RootState } from "@/app/store";

export default function RoleEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const role = useSelector((state: RootState) =>
    selectRoleById(state, Number(id))
  );

  const [name, setName] = useState("");

  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  useEffect(() => {
    if (role) {
      setName(role.name);
    }
  }, [role]);

  const handleSubmit = async () => {
    try {
      await updateRole({ id: Number(id), name }).unwrap();
      navigate("/dashboard/roles");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!role) return <div className="p-6">Role not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Role</h1>
      <Card className="space-y-4 p-6">
        <Input
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </div>
  );
}
