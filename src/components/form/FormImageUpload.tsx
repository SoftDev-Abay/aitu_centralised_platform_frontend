import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface FormImageUploadProps {
  name: string;
  control: any;
  label?: string;
  className?: string;
  inputClassName?: string;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({
  name,
  control,
  label = "Image",
  className,
  inputClassName,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-2", className)}>
          <Label className="font-medium">{label}</Label>
          <input
            type="file"
            accept="image/*"
            className={cn(inputClassName)}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
          {preview && (
            <img src={preview} alt="Preview" className="w-full max-w-sm mt-2" />
          )}
          {error?.message && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};
