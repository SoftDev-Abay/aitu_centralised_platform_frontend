import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { useUploadImageMutation } from "@/features/images/imagesApiSlice";
import { useCreateEventMutation } from "@/features/events/eventsApiSlice";
import { toast } from "react-hot-toast";
import { FormImageUpload } from "@/components/form/FormImageUpload";

const eventSchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  format: z.enum(["ONLINE", "OFFLINE"]),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File, { message: "Image required" }),
});

type EventFormValues = z.infer<typeof eventSchema>;

const CreateEventPage = () => {
  const [uploadImage] = useUploadImageMutation();
  const [createEvent] = useCreateEventMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      format: "ONLINE",
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      const imageId = await uploadImage(data.image).unwrap();

      const { image, ...rest } = data;
      const result = await createEvent({
        ...rest,
        imageId,
      }).unwrap();

      toast.success("Event created!");
      console.log("Event:", result);
    } catch (err: any) {
      toast.error("Failed to create event");
      console.error(err);
    }
  };

  return (
    <Section className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow">
      <SmartBreadcrumbs />
      <Card className="px-0 mt-7 pt-0 rounded-none gap-0">
        <CardHeader className="px-10 py-0">
          <h1 className="text-[24px] font-bold py-6">Create Event</h1>
        </CardHeader>
        <Separator />
        <CardContent className="px-10 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="name"
              control={control}
              label="Event Name"
              placeholder="Name"
              className="mb-4"
            />
            <FormInput
              name="address"
              control={control}
              label="Address"
              placeholder="Address"
              className="mb-4"
            />
            <FormInput
              name="startDate"
              control={control}
              label="Start Date"
              type="datetime-local"
              className="mb-4"
            />
            <FormInput
              name="endDate"
              control={control}
              label="End Date"
              type="datetime-local"
              className="mb-4"
            />
            <FormInput
              name="description"
              control={control}
              label="Description"
              placeholder="Optional"
              className="mb-4"
            />
            <FormImageUpload
              name="image"
              control={control}
              label="Upload Image"
            />
            <Button type="submit" className="mt-6">
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
};

export default CreateEventPage;
