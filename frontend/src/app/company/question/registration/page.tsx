"use client";

import React from "react";
import QuestionForm from "@/components/question/Questionregistration";

const NewQuestionPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Submit a New Question</h1>
      <QuestionForm />
    </div>
  );
};

export default NewQuestionPage;
