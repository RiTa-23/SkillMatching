"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { toast } from "sonner";

import fetcher from "@/lib/fetcher";

const SignupSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
  role_id: z.number().int(),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      role_id: 4, // デフォルトはguest
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setLoading(true);
    const { data, error } = await fetcher({
      url: "signup",
      method: "POST",
      body: values,
    });
    if (data) {
      toast.success("登録が完了しました", { position: "top-center" });
      router.push("/signin");
    }
    if (error) {
      toast.error("登録に失敗しました", { position: "top-center" });
    }
    setLoading(false);
  };

  const signout = async () => {
    const token = Cookies.get("token");
    const { data, error } = await fetcher({
      url: "signout",
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
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
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" className="w-[25%]" disabled={loading}>
                {loading ? "登録中..." : "登録"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/signin" className="border-b-2 mb-2">
          ログインはこちら
        </Link>
      </CardFooter>
      {/* <Button onClick={signout}>ログアウト</Button> */}
    </Card>
  );
};

export default SignupForm;
