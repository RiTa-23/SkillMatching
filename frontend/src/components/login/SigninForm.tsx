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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import fetcher from "@/lib/fetcher";

const SigninSchema = z.object({
  user_id: z.string().min(1, "IDを入力してください"),
  password: z.string().min(1, "Passwordを入力してください"),
});

type SigninFormValues = z.infer<typeof SigninSchema>;

const SigninForm = () => {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const signinAsPersonal = async (values: SigninFormValues) => {
    const { data, error } = await fetcher({
      url: "login",
      method: "POST",
      body: values,
    });
    if (data) {
      Cookies.set("token", (data as { token: string }).token);
      console.log("Login successful:", data);
    }
    if (error) {
      console.error("Validation errors:", error);
    }
  };

  const signinAsCompany = async (values: SigninFormValues) => {
    const { data, error } = await fetcher({
      url: "login",
      method: "POST",
      body: values,
    });
    if (data) {
      Cookies.set("token", (data as { token: string }).token);
      console.log("Login successful:", data);
    }
    if (error) {
      console.error("Validation errors:", error);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">個人用</TabsTrigger>
        <TabsTrigger value="password">企業用</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">個人用ログイン</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signinAsPersonal)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input placeholder="user_id" {...field} />
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
                  <Button type="submit">ログイン</Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/signup" className="border-b-2 mb-2">
              新規登録はこちら
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">企業用ログイン</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signinAsCompany)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input placeholder="user_id" {...field} />
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
                  <Button type="submit">ログイン</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SigninForm;
