import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Controller } from "react-hook-form";
import Toolbar from "./toolbar";
import InputErrorText from "@/components/form/InputErrorText";

const TextEditor = ({
  control,
  name,
  error,
  defaultValue,
}: {
  control: any;
  name: string;
  error?: string;
  defaultValue?: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const editor = useEditor({
          extensions: [StarterKit.configure(), Underline, Image],
          content: field.value || defaultValue || "",
          editorProps: {
            attributes: {
              class: "prose prose-sm focus:outline-none", // Tailwind typography
            },
          },
          onUpdate: ({ editor }) => {
            field.onChange(editor.getHTML());
          },
        });

        return (
          <div className="flex flex-col gap-2">
            <div className="border px-5 py-3 overflow-y-auto max-h-[400px] ">
              {/* <div className="border border-gray-300 rounded-lg p-3 max-h-[300px] overflow-y-auto"> */}
              <Toolbar editor={editor} />
              <EditorContent
                editor={editor}
                className=" text-base content "
              />
            </div>
            {error && <InputErrorText error={error} />}
          </div>
        );
      }}
    />
  );
};

export default TextEditor;
