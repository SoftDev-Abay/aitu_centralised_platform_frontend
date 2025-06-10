import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormSelectProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
  options: { value: string; label: string }[];
}

export function FormSelect({
  name,
  control,
  label,
  placeholder,
  className,
  selectClassName,
  options,
}: FormSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
          <Label htmlFor={name}>{label}</Label>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id={name}
              className={cn(
                selectClassName,
                error ? "border-red-500" : "w-full"
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      )}
    />
  );
}
