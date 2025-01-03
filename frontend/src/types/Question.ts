export interface Question {
  question_id: number;
  company_id: string;
  category_id?: string;
  language_id?: string;
  question: string;
  createdAt?: string;
  updatedAt?: string;
}
