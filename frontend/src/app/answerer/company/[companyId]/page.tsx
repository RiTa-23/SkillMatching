"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { Question } from "@/types/Question";

const AnswerSchema = z.object({
  answers: z.array(
    z.object({
      question_Id: z.number(),
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

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const getQuestions = async () => {
      const { data, error } = await fetcher<Question[]>({
        url: `question/${companyId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setQuestions(data as Question[]);
        form.reset({
          answers: data.map((q) => ({
            question_id: q.question_id,
            answer: "",
          })),
        });
        data.forEach((q) => append({ question_Id: q.question_id, answer: "" }));
      }
      if (error) {
        console.error(error);
      }
    };

    getQuestions();
  }, [companyId, form, append]);

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
            <Card key={field.question_Id} className="p-8 mt-10">
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
                          question={questions[index]}
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
