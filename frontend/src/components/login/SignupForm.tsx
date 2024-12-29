"use client";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import fetcher from "@/lib/fetcher";

const SignupSchema = z.object({
  user_id: z.string().min(1, "IDを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    const { data, error } = await fetcher({
      url: "register",
      method: "POST",
      body: values,
    });
    if (data) {
      console.log("Signup successful:", data);
    }
    if (error) {
      console.error("Validation errors:", error);
    }
  };

  const logout = async () => {
    const token = Cookies.get("token");
    const { data, error } = await fetcher({
      url: "logout",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      console.log("Logout successful:", data);
      Cookies.remove("token");
    }
    if (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">新規登録</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="id" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">登録</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/signin" className="border-b-2 mb-2">
          ログインはこちら
        </Link>
      </CardFooter>
      <Button onClick={logout}>ログアウト</Button>
    </Card>
  );
};

export default SignupForm;
