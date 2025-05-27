import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useState } from "react";

import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { useUploadImageMutation } from "@/features/images/imagesApiSlice";
import { useCreatePostMutation } from "@/features/posts/postsApiSlice";
import { FormImageUpload } from "@/components/form/FormImageUpload";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File),
});

type FormValues = z.infer<typeof schema>;

const CreatePostPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined as unknown as File,
    },
  });

  const [uploadImage] = useUploadImageMutation();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    try {
      const imageId = await uploadImage(data.image).unwrap();

      await createPost({
        title: data.title,
        description: data.description,
        imageId,
      }).unwrap();

      toast.success("Post created successfully");
    } catch (err: any) {
      toast.error("Failed to create post");
    }
  };

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      <SmartBreadcrumbs />
      <Card className="px-0 mt-7 pt-0 rounded-none gap-0">
        <CardHeader className="px-10 py-0">
          <h1 className="text-[24px] font-bold py-6">Create new post</h1>
        </CardHeader>
        <Separator />
        <CardContent className="px-10 py-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="title"
              label="Title"
              control={control}
              placeholder="Enter post title"
              inputClassName="py-3 px-5"
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Description</label>
                  <Textarea {...field} placeholder="Enter post description" />
                  {errors.description && (
                    <span className="text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              )}
            />

            <FormImageUpload
              name="image"
              control={control}
              label="Upload Image"
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
};

export default CreatePostPage;
