// src/pages/departments/CreateDepartmentPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDepartmentMutation } from "@/features/departments/departmentsApiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DepartmentCreatePage() {
  const [name, setName] = useState("");
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await createDepartment({ name }).unwrap();
      navigate("/dashboard/departments");
    } catch (err) {
      console.error("Failed to create department:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Department</h1>
      <Card className="space-y-4 p-6">
        <Input
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={!name.trim() || isLoading}>
          {isLoading ? "Creating…" : "Create Department"}
        </Button>
      </Card>
    </div>
  );
}
