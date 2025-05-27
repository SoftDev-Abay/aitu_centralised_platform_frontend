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

const clubSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ClubFormValues = z.infer<typeof clubSchema>;

const CreateClubPage = () => {
  const navigate = useNavigate();
  const [createClub, { isLoading }] = useCreateClubMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClubFormValues>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: ClubFormValues) => {
    try {
      await createClub({ ...data, status: "ACTIVE" }).unwrap();
      toast.success("Club created successfully!");
      navigate("/dashboard/clubs");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create club");
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
          <h1 className="text-[24px] font-bold py-6">Create Club</h1>
        </CardHeader>
        <Separator />
        <CardContent className="px-10 py-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 mt-6 max-w-xl"
          >
            <FormInput
              name="name"
              control={control}
              label="Club Name"
              placeholder="Enter club name"
            />
            <FormInput
              name="description"
              control={control}
              label="Club Description"
              placeholder="Enter club description"
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
