import { FormInput } from "@/components/form/FormInput";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const passowordSchema = z.object({
  current_passoword: z
    .string()
    .min(4, "Password must be at least 6 characters"),
  new_password: z.string().min(4, "Password must be at least 6 characters"),
  confirm_password: z.string().min(4, "Password must be at least 6 characters"),
});

type PasswordFormValues = z.infer<typeof passowordSchema>;

const ProfilePage = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passowordSchema),
    defaultValues: {
      current_passoword: "",
      new_password: "",
      confirm_password: "",
    },
  });

  return (
    <>
      <Section
        // variant="narrow"
        variant="wide"
        className="pt-[76px] pb-[112px] bg-brand-gray-bluish"
      >
        <div className="flex gap-20">
          <div className="bg-white pt-[56px] pb-[56px] px-[44px] flex items-center flex-col ">
            <img src="/images/profile.jpg" alt="" className="w-75 mb-5.5" />
            <p className="text-brand-gray-steel text-center max-w-66">
              Image size should be under 1MB and image ration needs to be 1:1
            </p>
          </div>
          <div className="flex flex-col gap-5 flex-1">
            <div className="flex gap-5 flex-wrap">
              <div className="flex w-full flex-1 flex-col gap-1.5 min-w-[240px]">
                <p className="text-brand-gray-steel text-sm">First name</p>
                <Input className="bg-white border-0" />
              </div>
              <div className="flex w-full flex-1 flex-col gap-1.5 min-w-[240px]">
                <p className="text-brand-gray-steel text-sm">Last name</p>
                <Input className="bg-white border-0" />
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5 min-w-[240px]">
              <p className="text-brand-gray-steel text-sm">ID</p>
              <Input className="bg-white border-0" />
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5 min-w-[240px]">
              <p className="text-brand-gray-steel text-sm">Email</p>
              <Input className="bg-white border-0" />
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5 min-w-[240px]">
              <p className="text-brand-gray-steel text-sm">Department</p>
              <Input className="bg-white border-0" />
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5 min-w-[240px]">
              <p className="text-brand-gray-steel text-sm">Security-key</p>
              <Input className="bg-white border-0" />
            </div>
          </div>
        </div>
      </Section>
      <Section
        // variant="narrow"
        variant="narrow"
        className="pt-[76px] pb-[112px] bg-white h-full flex-grow"
      >
        <div>
          <h1 className="text-center text-3xl font-semibold mb-6">
            Change password
          </h1>
          <form className="flex flex-col gap-4">
            <FormInput
              name="current_passoword"
              control={control}
              label="Current Password"
              placeholder="Password"
              type="password"
              className="mb-5  "
            />
            <FormInput
              name="new_password"
              control={control}
              label="New Password"
              placeholder="Password"
              type="password"
              className="mb-5  "
            />
            <FormInput
              name="confirm_password"
              control={control}
              label="Confirm Password"
              placeholder="Confirm new password"
              type="password"
              className="mb-6  "
            />

            <Button
              type="submit"
              className="mx-auto max-w-[187px] text-lg rounded-none h-14 px-6"
            >
              Change Password
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
};

export default ProfilePage;
