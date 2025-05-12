import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
const loginSchema = z.object({
  email: z.string().min(4, "email must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { access_token } = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setCredentials({ token: access_token }));

      navigate("/dashboard/tables");
      toast.success("Login successful!");
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Login failed, try again later.");
      }
    }
  };

  return (
    <div
      className={cn(
        "flex justify-center flex-wrap-reverse items-center gap-30 px-5 py-10",
        className
      )}
      {...props}
    >
      <img
        src="/logo-black-blue-text.svg"
        className="w-[328px] h-[169px] "
        alt=""
      />
      <div className="flex-grow max-w-[560px]">
        {/* <div className="w-full flex-grow max-w-[560px] "> */}
        <div className="text-center mb-[30px]">
          <div className="text-5xl font-semibold mb-3">Log in</div>
          <CardDescription className="text-lg">
            Welcome back! Please log in to access your account.
          </CardDescription>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <FormInput
            name="Email"
            control={control}
            label="Email"
            placeholder="Enter your Email"
            inputClassName="py-[16.5px] px-6"
            className="mb-5  "
          />
          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            type="password"
            inputClassName="py-[16.5px] px-6 "
            className="mb-5"
          />

          <div className="flex justify-end ">
            <Link to="/auth/forgot-password" className="text-sm text-gray-700">
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center mb-5">
            <Checkbox id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>
          <Button
            type="submit"
            className="w-full text-xl font-medium h-auto py-[18px]"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
