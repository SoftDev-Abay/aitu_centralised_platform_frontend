// PermissionEditPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useUpdatePermissionMutation } from "@/features/permissions/permissionsApiSlice";
import { selectPermissionById } from "@/features/permissions/permissionsSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RootState } from "@/app/store";

export default function PermissionEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const permission = useSelector((state: RootState) =>
    selectPermissionById(state, Number(id))
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objectId, setObjectId] = useState("");

  const [updatePermission, { isLoading }] = useUpdatePermissionMutation();

  useEffect(() => {
    if (permission) {
      setName(permission.name);
      setDescription(permission.description);
      setObjectId(permission.object_id.toString());
    }
  }, [permission]);

  const handleSubmit = async () => {
    try {
      await updatePermission({
        id: Number(id),
        name,
        description,
        object_id: Number(objectId),
      }).unwrap();
      navigate("/dashboard/permissions");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!permission) return <div className="p-6">Permission not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Permission</h1>
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
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </div>
  );
}
