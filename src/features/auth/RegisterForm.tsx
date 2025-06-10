import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/features/auth/authApiSlice";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { CardDescription } from "@/components/ui/card";

const registerSchema = z
  .object({
    securityKey: z
      .string()
      .min(4, "Security key must be at least 4 characters"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { securityKey: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const { securityKey, password } = data;
    try {
      // await register({ securityKey, password }).unwrap();
      await register({ securityKey, password, role: "ADMIN" }).unwrap();

      navigate("/auth/sign-in");
      toast.success("Registration successful!");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Registration failed, try again later."
      );
    }
  };

  return (
    <div
      className={cn(
        "flex justify-center items-center gap-30 px-5 py-10 flex-wrap-reverse",
        className
      )}
      {...props}
    >
      <img
        src="/logo-black-blue-text.svg"
        className="w-[328px] h-[169px]"
        alt=""
      />
      <div className="flex-grow max-w-[560px]">
        <div className="text-center mb-[30px]">
          <div className="text-5xl font-semibold mb-3">Register</div>
          <CardDescription className="text-lg">
            Create your account by filling in the details below.
          </CardDescription>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <FormInput
            name="securityKey"
            control={control}
            label="Security Key"
            placeholder="Enter your security key"
            inputClassName="py-[16.5px] px-6"
            className="mb-5"
          />
          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            placeholder="Enter your password"
            inputClassName="py-[16.5px] px-6"
            className="mb-5"
          />
          <FormInput
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
            placeholder="Enter your password again"
            inputClassName="py-[16.5px] px-6"
            className="mb-5"
          />
          <div className="flex items-center mb-5">
            <Checkbox id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">
              I agree with Privacy Policy
            </label>
          </div>

          <Button
            type="submit"
            className="w-full text-xl font-medium h-auto py-[18px]"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
