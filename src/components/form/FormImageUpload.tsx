import React, { useRef } from "react";
// import CloseIcon from "@/app/icons/CloseIcon";
import { useFieldArray, Controller } from "react-hook-form";
import InputErrorText from "./InputErrorText";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

type DocumentsProps = {
  control: any;
  error: any;
  name: string;
};

const MultiImageUpload = ({ control, error, name }: DocumentsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    // name: "gallery_images",
    // keyName: "gallery_images_id",
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleAddDocuments = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files ?? []);

    const files = uploadedFiles.map((file) => ({
      file,
      local: true,
    }));

    append(files);

    event.target.value = "";
    // hiddenFileInput.current.value = "";
  };

  return (
    <div className="add-images-wrapper">
      <input
        ref={hiddenFileInput}
        type="file"
        multiple
        onChange={handleAddDocuments}
        id="file-upload"
        className="hidden"
      />

      {/* <label htmlFor="file-upload">
        Add Documents
      </label> */}

      <Button type="button" onClick={() => hiddenFileInput.current?.click()}>
        Add Documents
      </Button>

      <p className="mb-3">Note: You can upload a maximum of 5 images</p>

      <div className="flex gap-2.5 flex-wrap">
        {fields.map(({ file, path }: any, index) => (
          // {fields.map(({ gallery_images_id, file, path }: any, index) => (
          <div key={"file-" + index}>
            <Controller
              control={control}
              name={`gallery_images.${index}`}
              render={() => (
                <div className="relative group">
                  <img
                    src={file ? URL.createObjectURL(file) : path}
                    alt="document"
                    className="rounded-sm w-25 h-25"
                  />
                  <div
                    className="absolute top-0 right-0 cursor-pointer shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => remove(index)}
                  >
                    <XIcon width={18} height={18} className="text-gray-600" />
                  </div>
                </div>
              )}
            />
          </div>
        ))}
      </div>

      {error && <InputErrorText error={error} />}
    </div>
  );
};

export default MultiImageUpload;
