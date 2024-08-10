import Card from "@/components/common/card/card";
import { FloatingInput } from "@/components/common/form-elements/floating-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { commitSession, getSession } from "@/lib/cookies";
import { registerSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authApiCall } from "@/services/auth";
import { apiBook } from "@/lib/urls";

export const meta: MetaFunction = () => {
  return [{ title: `Register` }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  data.forEach((value, key) => {
    session.set(key, value);
  });
  const cookie = await commitSession(session);
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = useFetcher();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    console.log("Data", data);
    try {
      setIsLoading(true);
      const res: any = await authApiCall({
        method: "POST",
        url: apiBook["REGISTER"],
        data: data,
      });
      const userData = {
        token: res.data.data.responseData.token,
        Id: res.data.data.responseData.user.Id,
        email: res.data.data.responseData.user.email,
        name: res.data.data.responseData.user.name,
      };
      fetcher.submit(userData, {
        method: "POST",
      });
      console.log("res", res);
    } catch (error) {
      console.log("error ", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-full justify-center items-center p-5">
      <Card className="min-h-80 flex flex-col justify-center max-w-md md:px-16 md:py-5 mx-auto">
        <div className="flex flex-col justify-center md:gap-y-6">
          <div>
            <h2 className="text-center font-semibold text-xl uppercase pb-3">
              join with us
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="">
                        <FloatingInput
                          label="Name"
                          required={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="">
                        <FloatingInput
                          label="Email"
                          required={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FloatingInput
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            required={true}
                            {...field}
                          />
                          <Button
                            variant={"outline"}
                            type="button"
                            onClick={handleToggle}
                            className="border-none text-slate-600 bg-transparent hover:bg-transparent h-fit p-0 absolute top-2 right-2"
                          >
                            {showPassword ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <p className="text-sm text-center p-2">
          Already have a account, go back to{" "}
          <Link className="underline " to={"/login"}>
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
