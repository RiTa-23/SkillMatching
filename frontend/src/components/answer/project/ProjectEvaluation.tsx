"use client";

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

import type { ProjectDetail } from "@/types/Project";

const EvaluationSchema = z.object({
  evaluation: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "1~5のいずれかを選択してください",
  }),
  comment: z.string().max(100, "100文字以内で入力してください"),
});

export type EvaluationFormValues = z.infer<typeof EvaluationSchema>;

interface ProjectEvaluationProps {
  project: ProjectDetail;
}

const ProjectEvaluation = ({ project }: ProjectEvaluationProps) => {
  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(EvaluationSchema),
  });

  function onSubmit(data: EvaluationFormValues) {
    console.log(data);
  }

  return (
    <Card className="w-[80%] max-w-[800px] p-8 mt-10">
      <CardContent>
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
              name="evaluation"
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
              name="comment"
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
            <Button type="submit">提出</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectEvaluation;
