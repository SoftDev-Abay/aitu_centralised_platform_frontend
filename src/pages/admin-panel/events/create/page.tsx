import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { useUploadFilesMutation } from "@/features/files/filesApiSlice";
import { useCreateEventMutation } from "@/features/events/eventsApiSlice";
import { toast } from "react-hot-toast";
import MultiImageUpload from "@/components/form/FormImageUpload";
import { FormSelect } from "@/components/form/FormSelect";
import { formatTime } from "@/lib/utils";
import SelectAdvaced from "@/components/ui/select-advanced";
import { useGetAllUsersQuery } from "@/features/users/usersApiSlice";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/shared/text-editor/text-editor";
import { EventType } from "@/features/events/types";

const defaultEventDescription = `
  <h2>🎉 Event Overview</h2>
  <p>Welcome to our event! Here's a quick overview of what it's all about.</p>

  <h3>📍 Location</h3>
  <p>Provide details on how to join (venue address or online platform link).</p>

  <h3>📅 Agenda</h3>
  <ul>
    <li><strong>Registration:</strong> Include register cabinet</li>
    <li><strong>Start:</strong> Include start time and timezone</li>
    <li><strong>End:</strong> Include end time and timezone</li>
  </ul>

  <h3>👤 Who Should Attend?</h3>
  <p>Describe your target audience. Is this event for students, professionals, everyone?</p>

  <h3>❗ Important Notes</h3>
  <ul>
    <li>RSVP before a certain date</li>
    <li>Bring ID / prepare presentation / install Zoom, etc.</li>
  </ul>

  <blockquote>
    “The best way to predict the future is to create it.” — Abraham Lincoln
  </blockquote>

  <p><em>Feel free to edit or remove this content and describe your event in your own words.</em></p>
`;

const eventSchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  format: z.enum(["ONLINE", "OFFLINE"]),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().optional(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        local: z.boolean().optional(),
      })
    )
    .min(1, "At least one image is required"),
  adminIds: z.array(z.number(), { required_error: "Choose admins" }),
});

type EventFormValues = z.infer<typeof eventSchema>;

const CreateEventPage = () => {
  const [uploadImages] = useUploadFilesMutation();
  const [createEvent] = useCreateEventMutation();
  const {
    data: usersData,
    // isLoading: isLoadingUsers,
    // isError: isErrorUsers,
  } = useGetAllUsersQuery();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      format: "ONLINE",
      description: defaultEventDescription,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      const imageData = await uploadImages(
        data.images.map((img) => img.file)
      ).unwrap();

      const { images, ...rest } = data;
      const result = await createEvent({
        ...rest,
        startDate: formatTime(data.startDate),
        endDate: formatTime(data.endDate),
        imageIds: imageData.data.map((ent) => ent.fileName),
        eventType: EventType.UNI_EVENT, // Replace "EVENT" with the appropriate EventType value if needed
      }).unwrap();

      toast.success("Event created!");
      console.log("Event:", result);
    } catch (err: any) {
      toast.error("Failed to create event");
      console.error(err);
    }
  };

  const usersOptions = usersData?.map((user) => ({
    label: user.email,
    value: user.id,
  }));

  return (
    <Section
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
      variant="wide"
    >
      <SmartBreadcrumbs />
      <Card className="px-0 mt-7 pt-0 rounded-none gap-0">
        <CardHeader className="px-10 py-0">
          <h1 className="text-[24px] font-bold py-6">Create Event</h1>
        </CardHeader>
        <Separator />
        <CardContent className="px-10 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              name="name"
              control={control}
              label="Name"
              placeholder="Name"
            />
            <TextEditor
              name="description"
              control={control}
              error={errors.description && errors.description.message}
              defaultValue=""
            />

            <div className="flex gap-5">
              <FormInput
                name="address"
                control={control}
                label="Address"
                placeholder="Address"
                className=" w-full"
              />
              <FormSelect
                name="format"
                control={control}
                label="Format"
                placeholder="Выберите формат"
                options={[
                  { value: "OFFLINE", label: "OFFLINE" },
                  { value: "ONLINE", label: "ONLINE" },
                ]}
                className=" w-full"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Admins</Label>
              <SelectAdvaced
                options={usersOptions}
                register={register("adminIds")}
                name="adminIds"
                control={control}
                error={errors.adminIds && errors.adminIds.message}
                multiple
              />
            </div>
            <div className="flex gap-5">
              <FormInput
                name="startDate"
                control={control}
                label="Start Date"
                type="datetime-local"
                className=""
              />
              <FormInput
                name="endDate"
                control={control}
                label="End Date"
                type="datetime-local"
                className=""
              />
            </div>

            <MultiImageUpload
              name="images"
              control={control}
              error={errors.images}
              // label="Upload Image"
            />
            {/* <div>{errors.images && errors.images.message}</div> */}

            <div className="flex justify-between gap-2 mt-6">
              <Button type="submit" variant={"outline"}>
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
};

export default CreateEventPage;
