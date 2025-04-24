// RoleCreatePage.tsx
import { useCreateRoleMutation } from "@/features/roles/rolesApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RoleCreatePage() {
  const [name, setName] = useState("");
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createRole({ name }).unwrap();
      navigate("/dashboard/roles");
    } catch (err) {
      console.error("Failed to create permission:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Role</h1>
      <Card className="space-y-4 p-6">
        <Input
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </Card>
    </div>
  );
}
