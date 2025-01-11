export interface Question {
  question_id: number;
  company_name: string;
  category_name?: string;
  language_name?: string;
  question_text: string;
  createdAt?: string;
  updatedAt?: string;
}
