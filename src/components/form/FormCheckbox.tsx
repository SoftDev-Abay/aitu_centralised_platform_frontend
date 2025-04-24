import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormCheckboxProps {
  name: string;
  control: any;
  label: string;
}

export function FormCheckbox({ name, control, label }: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />
          <Label htmlFor={name}>{label}</Label>
        </div>
      )}
    />
  );
}
