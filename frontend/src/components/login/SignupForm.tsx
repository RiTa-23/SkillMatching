"use client";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
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
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        values
      );
      console.log("User registered successfully:", response.data);
      alert("ユーザー登録が完了しました");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Validation errors:", error.response.data.errors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const logout = async () => {
    try {
      const token = Cookies.get("token");
      console.log("Token:", token);
      const response = await axios.post("http://localhost:8080/api/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("Logout successful:", response.data);
      Cookies.remove("token");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("予期しないエラーが発生しました");
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
