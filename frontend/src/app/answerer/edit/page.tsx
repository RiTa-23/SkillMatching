"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import SkillField from "@/components/answer/form/SkillField";
import HopeLanguageField from "@/components/answer/form/HopeLanguageField";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { User } from "@/types/user";
import type { Skill } from "@/types/Skill";
import type { HopeLanguage } from "@/types/Language";

const SkillsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthday: z.string().min(1, "Birthday is required"),
  email: z.string().email("Invalid email"),
  skills: z.array(
    z.object({
      language_id: z.number(),
      level: z.number().min(1).max(5),
    })
  ),
  hope_languages: z.array(
    z.object({
      language_id: z.number(),
    })
  ),
});

export type SkillsFormValues = z.infer<typeof SkillsSchema>;

const MySkillEditPage = () => {
  const [loadingForGet, setLoadingForGet] = useState(false);
  const [loadingForUpdate, setLoadingForUpdate] = useState(false);
  const router = useRouter();

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(SkillsSchema),
    defaultValues: {
      name: "",
      birthday: "",
      email: "",
      skills: [],
      hope_languages: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingForGet(true);
      const token = Cookies.get("token");
      const { data: profileData, error: profileError } = await fetcher<User>({
        url: "user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: skillData, error: skillError } = await fetcher<Skill[]>({
        url: "skill",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: hopeLanguageData, error: hopeLanguageError } =
        await fetcher<HopeLanguage[]>({
          url: "hope-language",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (profileData && skillData && hopeLanguageData) {
        form.reset({
          name: profileData.name,
          birthday: profileData.birthday,
          email: profileData.email,
          skills: skillData.map((skill) => ({
            language_id: skill.language_id,
            level: skill.level,
          })),
          hope_languages: hopeLanguageData.map((hopeLanguage) => ({
            language_id: hopeLanguage.language_id,
          })),
        });
      }
      if (profileError) {
        toast.error("ユーザー情報の取得に失敗しました", {
          position: "top-center",
        });
      }
      if (skillError) {
        toast.error("スキル情報の取得に失敗しました", {
          position: "top-center",
        });
      }
      if (hopeLanguageError) {
        toast.error("希望言語の取得に失敗しました", {
          position: "top-center",
        });
      }
      setLoadingForGet(false);
    };

    fetchData();
  }, [form]);

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const {
    fields: hope_languagesFields,
    append: hope_languagesAppend,
    remove: hopeLanguageRemove,
  } = useFieldArray({
    control: form.control,
    name: "hope_languages",
  });

  interface UpdateProfileParams {
    token: string | undefined;
    values: SkillsFormValues;
  }

  const updateProfile = async ({
    token,
    values,
  }: UpdateProfileParams): Promise<void> => {
    setLoadingForUpdate(true);
    const { data, error } = await fetcher<User>({
      url: "user",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: values,
    });
    if (data) {
      toast.success("ユーザー情報を更新しました", {
        position: "top-center",
      });
      router.push("/answerer");
    }
    if (error) {
      toast.error("ユーザー情報の更新に失敗しました", {
        position: "top-center",
      });
      setLoadingForUpdate(false);
    }
  };

  const updateSkills = async ({
    token,
    values,
  }: UpdateProfileParams): Promise<void> => {
    console.log("languages", values.skills);
    setLoadingForUpdate(true);
    const { data, error } = await fetcher<Skill>({
      url: "skill",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { skills: values.skills },
    });
    if (data) {
      toast.success("スキル情報を更新しました", {
        position: "top-center",
      });
      router.push("/answerer");
    }
    if (error) {
      toast.error("スキル情報の更新に失敗しました", {
        position: "top-center",
      });
    }
    setLoadingForUpdate(false);
  };

  const updateHopeLanguages = async ({
    token,
    values,
  }: UpdateProfileParams): Promise<void> => {
    console.log("hope languages", values.hope_languages);
    setLoadingForUpdate(true);
    const { data, error } = await fetcher<HopeLanguage>({
      url: "hope-language",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { hope_languages: values.hope_languages },
    });
    if (data) {
      toast.success("希望言語を更新しました", {
        position: "top-center",
      });
      router.push("/answerer");
    }
    if (error) {
      toast.error("希望言語の更新に失敗しました", {
        position: "top-center",
      });
    }
    setLoadingForUpdate(false);
  };

  const onSubmit = async (values: SkillsFormValues) => {
    const token = Cookies.get("token");
    updateProfile({ token, values });
    updateSkills({ token, values });
    updateHopeLanguages({ token, values });
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <Card className="w-[80%] max-w-[800px] p-8 mt-20">
        <CardContent>
          {loadingForGet ? (
            <p className="pt-4">Loading...</p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>氏名</FormLabel>
                      <FormControl>
                        <Input placeholder="氏名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>生年月日</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="生年月日" {...field} />
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
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input placeholder="メールアドレス" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem className="flex flex-col space-y-8">
                      <FormLabel>使用可能技術</FormLabel>
                      {skillFields.map((item, index) => (
                        <SkillField
                          key={item.id}
                          form={form}
                          index={index}
                          remove={skillRemove}
                        />
                      ))}
                      <Button
                        type="button"
                        className="w-1/2 max-w-[100px]"
                        onClick={() =>
                          skillAppend({ language_id: 0, level: 1 })
                        }
                      >
                        <Plus />
                        追加
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hope_languages"
                  render={() => (
                    <FormItem className="flex flex-col space-y-8">
                      <FormLabel>希望技術</FormLabel>
                      {hope_languagesFields.map((item, index) => (
                        <HopeLanguageField
                          key={item.id}
                          form={form}
                          index={index}
                          remove={hopeLanguageRemove}
                        />
                      ))}
                      <Button
                        type="button"
                        className="w-1/2 max-w-[100px]"
                        onClick={() => hope_languagesAppend({ language_id: 0 })}
                      >
                        <Plus />
                        追加
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-[60%] max-w-[100px] text-xl py-6 mt-4"
                    disabled={loadingForUpdate}
                  >
                    {loadingForUpdate ? "更新中..." : "更新"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MySkillEditPage;
