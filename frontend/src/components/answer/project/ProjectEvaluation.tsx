"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { ProjectDetail } from "@/types/Project";

const EvaluationSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "1~5のいずれかを選択してください",
  }),
  feedback: z.string().max(100, "100文字以内で入力してください"),
});

export type EvaluationFormValues = z.infer<typeof EvaluationSchema>;

interface ProjectEvaluationProps {
  project: ProjectDetail;
  loading: boolean;
}

const ProjectEvaluation = ({ project, loading }: ProjectEvaluationProps) => {
  const [loadingForPost, setLoadingForPost] = useState(false);
  const { projectId } = useParams();
  const router = useRouter();

  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(EvaluationSchema),
    defaultValues: {
      rating: undefined,
      feedback: "",
    },
  });

  const onSubmit = async (values: EvaluationFormValues) => {
    setLoadingForPost(true);
    const token = Cookies.get("token");
    const { data, error } = await fetcher({
      url: `project/${projectId}/evaluation`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: values,
    });
    if (data) {
      toast.success("評価が完了しました", { position: "top-center" });
      router.push("/answerer/project");
    }
    if (error) {
      toast.error("評価に失敗しました", { position: "top-center" });
    }
    setLoadingForPost(false);
  };

  return (
    <Card className="w-[80%] max-w-[800px] p-8 mt-10">
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul>
              <li>{project.title}</li>
              <li>{project.contents}</li>
              <li>{project.start_date}</li>
              <li>{project.end_date}</li>
              <li>{project.status}</li>
            </ul>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>評価</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <RadioGroupItem value="1" />
                          <RadioGroupItem value="2" />
                          <RadioGroupItem value="3" />
                          <RadioGroupItem value="4" />
                          <RadioGroupItem value="5" />
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>コメント</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="" disabled={loadingForPost}>
                  {loadingForPost ? "処理中..." : "評価する"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectEvaluation;
