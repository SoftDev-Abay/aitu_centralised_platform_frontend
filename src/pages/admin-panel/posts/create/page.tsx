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
import { useUploadFilesMutation } from "@/features/files/filesApiSlice";
import { useCreatePostMutation } from "@/features/posts/postsApiSlice";
import MultiImageUpload from "@/components/form/FormImageUpload";
import { postCategoriesOptions } from "@/features/posts/constants";
import SelectAdvaced from "@/components/ui/select-advanced";
import { PostCategories } from "@/features/posts/types";
import { FormTextarea } from "@/components/form/FormTextAreat";
// import { FormImageUpload } from "@/components/form/FormImageUpload";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  // image: z.instanceof(File),
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        local: z.boolean().optional(),
      })
    )
    .min(1, "At least one image is required"),
  category: z.nativeEnum(PostCategories, {
    required_error: "Category is required",
  }),
});

type FormValues = z.infer<typeof schema>;

const CreatePostPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      // image: undefined as unknown as File,
    },
  });

  const [uploadImages] = useUploadFilesMutation();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    try {
      const imageData = await uploadImages(
        data.images.map((img) => img.file)
      ).unwrap();

      const { images, ...rest } = data;

      await createPost({
        ...rest,
        images: imageData.data.map((ent) => ent.fileName),
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

            {/* <Controller
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
            /> */}
            <FormTextarea
              name="description"
              control={control}
              label="Description"
              placeholder="Enter your description here..."
              description="This will be displayed publicly."
              required
            />

            <SelectAdvaced
              options={postCategoriesOptions}
              register={register("category")}
              name="category"
              control={control}
              error={errors.category && errors.category.message}
              // multiple
            />

            <MultiImageUpload
              name="images"
              control={control}
              error={errors.images}
              // label="Upload Image"
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
