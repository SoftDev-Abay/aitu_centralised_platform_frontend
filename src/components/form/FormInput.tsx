import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string; // New prop for Input's className
}

export function FormInput({
  name,
  control,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName, // Destructure the new prop
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col space-y-2", className)}>
          <Label htmlFor={name}>{label} </Label>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={cn(inputClassName, error ? "border-red-500" : "")} // Combine inputClassName with error styles
            value={field.value ?? ""} // ✅ ensure controlled value
          />
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      )}
    />
  );
}
