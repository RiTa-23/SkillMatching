"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import AnswerField from "@/components/answer/company/questions/AnswerField";
import type { Question } from "@/types/Question";

const AnswerSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number(),
      answer: z.string().min(1, "回答を入力してください"),
    })
  ),
});

export type AnswerFormValues = z.infer<typeof AnswerSchema>;

const AnswerPage = () => {
  const dummyQuestions: Question[] = [
    {
      id: 1,
      category: "技術力",
      language: "JavaScript",
      question: "この質問は何問目ですか？",
    },
    {
      id: 2,
      category: "技術力",
      language: "Go",
      question: "この質問は何問目ですか？",
    },
    {
      id: 3,
      category: "問題解決力",
      question: "この質問は何問目ですか？",
    },
    {
      id: 4,
      category: "コミュニケーション力",
      question: "この質問は何問目ですか？",
    },
    {
      id: 5,
      question: "この質問は何問目ですか？",
    },
  ];

  const form = useForm<AnswerFormValues>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answers: dummyQuestions.map((q) => ({ questionId: q.id, answer: "" })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const onSubmit = (values: AnswerFormValues) => {
    console.log("Answers: ", values);
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <h2 className="text-2xl font-bold mt-8">会社名</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[80%] max-w-[800px] space-y-8"
        >
          {fields.map((field, index) => (
            <Card key={field.id} className="p-8 mt-10">
              <CardContent>
                <FormField
                  control={form.control}
                  name={`answers.${index}.answer`}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <AnswerField
                          index={index}
                          form={form}
                          question={dummyQuestions[index]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-[60%] max-w-[100px] text-xl py-6 my-4"
            >
              提出
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerPage;
