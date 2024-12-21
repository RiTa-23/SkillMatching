"use client";

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

import LanguagesField from "@/components/answer/form/LanguageField";

const SkillsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthday: z.string().min(1, "Birthday is required"),
  email: z.string().email("Invalid email"),
  languages: z.array(
    z.object({
      id: z.number(),
      level: z.number().min(1).max(5),
    })
  ),
});

export type SkillsFormValues = z.infer<typeof SkillsSchema>;

const ComboboxDemo = () => {
  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(SkillsSchema),
    defaultValues: {
      name: "",
      birthday: "",
      email: "",
      languages: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const onSubmit = (values: SkillsFormValues) => {
    console.log("Skills: ", values);
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <Card className="w-[80%] max-w-[700px] p-8 mt-20">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                name="languages"
                render={() => (
                  <FormItem className="flex flex-col space-y-8">
                    <FormLabel>使用可能技術</FormLabel>
                    {fields.map((item, index) => (
                      <LanguagesField
                        key={item.id}
                        form={form}
                        index={index}
                        remove={remove}
                      />
                    ))}
                    <Button
                      type="button"
                      className="w-1/2 max-w-[100px]"
                      onClick={() => append({ id: 0, level: 1 })}
                    >
                      <Plus />
                      追加
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button type="submit" className="w-[60%] max-w-[100px] text-xl py-6 mt-4">
                  登録
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComboboxDemo;
