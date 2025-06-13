import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateClubMutation } from "@/features/clubs/clubsApiSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import MultiImageUpload from "@/components/form/FormImageUpload";
import { Label } from "@/components/ui/label";
import SelectAdvaced from "@/components/ui/select-advanced";
import { useGetAllUsersQuery } from "@/features/users/usersApiSlice";
import { useUploadFilesMutation } from "@/features/files/filesApiSlice";
import TextEditor from "@/components/shared/text-editor/text-editor";

const defaultClubDescription = `
  <h2>🏛️ About the Club</h2>
  <p>Welcome to our club! Here's a short overview of what we stand for.</p>

  <h3>🎯 Mission</h3>
  <p>Describe your club’s mission and why it exists. What is your purpose?</p>

  <h3>📌 Activities</h3>
  <ul>
    <li>Weekly meetups and discussions</li>
    <li>Workshops, guest lectures, or competitions</li>
    <li>Collaborative projects and community engagement</li>
  </ul>

  <h3>👥 Who Can Join?</h3>
  <p>Let others know who this club is for — open to all, or specific departments, interests, etc.</p>

  <h3>💬 Communication</h3>
  <p>Mention how members stay in touch — Telegram, Discord, WhatsApp, etc.</p>

  <blockquote>
    “Clubs don’t make people better. People make clubs better.” – Unknown
  </blockquote>

  <p><em>Feel free to personalize or remove this template content!</em></p>
`;

const clubSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        local: z.boolean().optional(),
      })
    )
    .min(1, "At least one image is required"),
  presidentId: z.number(),
  // adminIds: z.array(z.number(), { required_error: "Choose admins" }),
});

type ClubFormValues = z.infer<typeof clubSchema>;

const CreateClubPage = () => {
  const navigate = useNavigate();

  const [uploadImages] = useUploadFilesMutation();

  const [createClub, { isLoading }] = useCreateClubMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ClubFormValues>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: "",
      description: defaultClubDescription,
    },
  });

  const { data: usersData } = useGetAllUsersQuery();

  const onSubmit = async (data: ClubFormValues) => {
    try {
      const imageData = await uploadImages(
        data.images.map((img) => img.file)
      ).unwrap();

      const { images, ...rest } = data;

      await createClub({
        ...rest,
        status: "ACTIVE",
        images: imageData.data.map((ent) => ent.fileName),
        presidentId: Number(data.presidentId),
      }).unwrap();
      toast.success("Club created successfully!");
      navigate("/dashboard/clubs");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create club");
    }
  };

  const usersOptions = usersData?.map((user) => ({
    label: user.email,
    value: user.id,
  }));

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      <SmartBreadcrumbs />
      <Card className="px-0 mt-7 pt-0 rounded-none gap-0">
        <CardHeader className="px-10 py-0">
          <h1 className="text-[24px] font-bold py-6">Create Club</h1>
        </CardHeader>
        <Separator />
        <CardContent className="px-10 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6 ">
            <FormInput
              name="name"
              control={control}
              label="Name"
              placeholder="Enter club name"
            />
            <TextEditor
              name="description"
              control={control}
              error={errors.description && errors.description.message}
              defaultValue=""
            />
            <div className="flex flex-col space-y-2">
              <Label>President</Label>
              <SelectAdvaced
                options={usersOptions}
                register={register("presidentId")}
                name="presidentId"
                control={control}
                error={errors.presidentId && errors.presidentId.message}
              />
            </div>

            <MultiImageUpload
              name="images"
              control={control}
              error={errors.images}
              // label="Upload Image"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Club"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
};

export default CreateClubPage;
