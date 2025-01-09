import { UseFormReturn } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import type { AnswerFormValues } from "@/app/answerer/company/[companyId]/page";
import type { Question } from "@/types/Question";

interface AnswerFieldProps {
  index: number;
  question_id: number;
  form: UseFormReturn<AnswerFormValues>;
  question: Question;
}

const AnswerField = ({
  index,
  question_id,
  form,
  question,
}: AnswerFieldProps) => {
  form.setValue(`answers.${index}.question_id`, question_id);
  return (
    <Card className="p-8 mt-10">
      <CardContent>
        <div className="mb-4">
          <p className="text-lg font-semibold">{question.question_text}</p>
          <div className="space-x-2">
            {question.category_name && (
              <Badge className="mt-2">{question.category_name}</Badge>
            )}
            {question.language_name && (
              <Badge className="mt-2">{question.language_name}</Badge>
            )}
          </div>
        </div>
        <Textarea
          placeholder="回答を入力"
          className="w-full"
          rows={5}
          onChange={(e) => {
            form.setValue(`answers.${index}.answer`, e.target.value);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default AnswerField;
