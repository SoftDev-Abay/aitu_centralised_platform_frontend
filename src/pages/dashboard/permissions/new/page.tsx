// PermissionCreatePage.tsx
import { useCreatePermissionMutation } from "@/features/permissions/permissionsApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PermissionCreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objectId, setObjectId] = useState("");
  const [createPermission, { isLoading }] = useCreatePermissionMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createPermission({
        name,
        description,
        object_id: Number(objectId),
      }).unwrap();
      navigate("/dashboard/permissions");
    } catch (err) {
      console.error("Failed to create permission:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Permission</h1>
      <Card className="space-y-4 p-6">
        <Input
          placeholder="Permission Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Object ID"
          value={objectId}
          onChange={(e) => setObjectId(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </Card>
    </div>
  );
}
