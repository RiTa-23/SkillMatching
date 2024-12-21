"use client";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  id: z.string().min(1, "IDを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    console.log(values);
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
              name="id"
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
    </Card>
  );
};

export default SignupForm;
