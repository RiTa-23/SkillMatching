"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
import { toast } from "sonner";

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
  const [loadingForGet, setLoadingForGet] = useState(false);
  const [loadingForPost, setLoadingForPost] = useState(false);
  const { companyId } = useParams();
  const router = useRouter();

  const form = useForm<AnswerFormValues>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answers: [],
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      setLoadingForGet(true);
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
        toast.error("質問の取得に失敗しました");
      }
      setLoadingForGet(false);
    };

    fetchData();
  }, []);

  const onSubmit = async (values: AnswerFormValues) => {
    setLoadingForPost(true);
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
      toast.success("回答を提出しました", { position: "top-center" });
      router.push(`/answerer/company`);
    }
    if (error) {
      toast.error("回答の提出に失敗しました", { position: "top-center" });
    }
    setLoadingForPost(false);
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      {loadingForGet ? (
        <p className="pt-6">Loading...</p>
      ) : (
        questions.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-8">
              {questions[0].company_name}
            </h2>
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
                    disabled={loadingForPost}
                  >
                    {loadingForPost ? "送信中..." : "送信"}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )
      )}
    </div>
  );
};

export default AnswerPage;
