import React from "react";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormTextareaProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export const FormTextarea = ({
  name,
  control,
  label,
  placeholder,
  description,
  className,
  disabled,
  required = false,
  error,
}: FormTextareaProps) => {
  return (
    <div className={`grid w-full gap-1.5 ${className}`}>
      {label && (
        <Label htmlFor={name} className={error ? "text-destructive" : ""}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            className={
              error ? "border-destructive focus-visible:ring-destructive" : ""
            }
          />
        )}
      />

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};
