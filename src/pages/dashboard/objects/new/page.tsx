// ObjectCreatePage.tsx
import { useCreateObjectMutation } from "@/features/objects/objectsApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ObjectCreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createObject, { isLoading }] = useCreateObjectMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createObject({ name, description }).unwrap();
      navigate("/dashboard/objects");
    } catch (err) {
      console.error("Failed to create object:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Object</h1>
      <Card className="space-y-4 p-6">
        <Input
          placeholder="Object Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </Card>
    </div>
  );
}
