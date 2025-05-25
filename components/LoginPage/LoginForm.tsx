"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_NAME } from "@/lib/constant";
import { getTenantBrowserSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { loginValidation } from "@/services/Auth/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Turnstile, { BoundTurnstileObject } from "react-turnstile";
import { toast } from "sonner";
import { z } from "zod";
import NavigationLoader from "../ui/navigationLoader";
import { PasswordInput } from "../ui/passwordInput";
export const LoginSchema = z.object({
  userName: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(50, "Username must be at most 50 characters long")
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9._]*$/, // ✅ Allows letters OR numbers at the start
      "Username must start with a letter or number and can only contain letters, numbers, dots, and underscores"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export function LoginForm({
  companyName,
  className,
  ...props
}: React.ComponentProps<"div"> & { companyName: string }) {
  const captcha = useRef<BoundTurnstileObject>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const supabase = getTenantBrowserSupabase(companyName);

  const handleSignIn = async (data: LoginFormValues) => {
    try {
      if (!captchaToken) {
        if (captcha.current) {
          captcha.current.reset();
          captcha.current.execute();
        }

        return toast.warning(
          "Please verify that you are human by completing the captcha"
        );
      }

      await loginValidation(companyName, supabase, {
        userName: data.userName,
        password: data.password,
        captchaToken: captchaToken || "",
      });

      if (captcha.current) {
        captcha.current.reset();
      }

      toast.success("Login Successfully");

      router.push(`/${companyName}/dashboard`);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isSubmitting && <NavigationLoader visible={isSubmitting} />}
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(handleSignIn)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground w-full">
                  Login to your {companyName.replace("-", " ")} distribution
                  account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  variant="non-card"
                  id="username"
                  placeholder="Username"
                  className="dark:placeholder:text-white dark:text-white"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="text-sm text-red-500">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  variant="non-card"
                  placeholder="Password"
                  className="dark:placeholder:text-white dark:text-white"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Turnstile
                size="flexible"
                sitekey={
                  companyName === COMPANY_NAME.PALPROJECT_WAREHOUSING
                    ? process.env
                        .NEXT_PUBLIC_HCAPTCHA_SITE_KEY_WAREHOUSE_PROJECT || ""
                    : process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY_DISTRICT_1 || ""
                }
                onVerify={(token) => {
                  setCaptchaToken(token);
                }}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://media.istockphoto.com/id/1138429558/photo/rows-of-shelves.jpg?s=612x612&w=0&k=20&c=0E4uvaa-THb-Wj-QZKpUSPgwjfIMFW3vH7NRx1iWMIc="
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
