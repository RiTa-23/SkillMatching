"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import AnswerField from "@/components/answer/company/questions/AnswerField";

import fetcher from "@/lib/fetcher";
import Cookies from "js-cookie";
import type { Question } from "@/types/Question";

const AnswerSchema = z.object({
  answers: z.array(
    z.object({
      question_id: z.number(),
      answer: z.string().min(1, "回答を入力してください"),
    })
  ),
});

export type AnswerFormValues = z.infer<typeof AnswerSchema>;

const AnswerPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { companyId } = useParams();

  const form = useForm<AnswerFormValues>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answers: [],
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      const { data, error } = await fetcher<Question[]>({
        url: `question/${companyId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setQuestions(data);
      }
      if (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values: AnswerFormValues) => {
    const token = Cookies.get("token");
    const { data, error } = await fetcher({
      url: `answer`,
      method: "POST",
      body: values,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      console.log("Answer submitted:", data);
    }
    if (error) {
      console.error("Validation errors:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <h2 className="text-2xl font-bold mt-8">会社名</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[80%] max-w-[800px] space-y-8"
        >
          {questions.map((question, index) => (
            <FormField
              key={question.question_id}
              control={form.control}
              name={`answers.${index}.answer`}
              render={() => (
                <FormItem>
                  <FormControl>
                    <AnswerField
                      index={index}
                      question_id={question.question_id}
                      form={form}
                      question={question}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
