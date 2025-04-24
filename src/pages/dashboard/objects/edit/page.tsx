import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateObjectMutation } from "@/features/objects/objectsApiSlice";
import { selectObjectById } from "@/features/objects/objectsSlice";
import { RootState } from "@/app/store";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ObjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const object = useSelector((state: RootState) =>
    selectObjectById(state, Number(id))
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [updateObject, { isLoading }] = useUpdateObjectMutation();

  useEffect(() => {
    if (object) {
      setName(object.name);
      setDescription(object.description);
    }
  }, [object]);

  const handleSubmit = async () => {
    try {
      await updateObject({
        id: Number(id),
        name,
        description,
      }).unwrap();
      navigate(`/dashboard/objects`);
      //   navigate(`/dashboard/objects/${id}`);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!object) return <div className="p-6">Object not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Object</h1>
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
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </div>
  );
}
