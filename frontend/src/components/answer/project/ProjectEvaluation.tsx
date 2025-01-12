"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { ProjectDetail } from "@/types/Project";
import { formatDate } from "@/lib/formatDate";

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
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table className="mb-6">
              <TableBody>
                <TableRow>
                  <TableCell>概要</TableCell>
                  <TableCell>{project.contents}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>開始日</TableCell>
                  <TableCell>{formatDate(project.start_date)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>終了日</TableCell>
                  <TableCell>{formatDate(project.end_date)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>進捗</TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                      <FormLabel className="text-xl font-semibold">
                        評価
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          {Array.from({ length: 5 }, (_, i) => (
                            <div key={i + 1} className="flex items-center space-x-2">
                              <RadioGroupItem value={(i + 1).toString()} id={(i + 1).toString()} />
                              <FormLabel htmlFor={(i + 1).toString()}>{i + 1}</FormLabel>
                            </div>
                          ))}
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
                      <FormLabel className="text-xl font-semibold">
                        コメント
                      </FormLabel>
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
