// app/company/question/[id]/page.tsx

import QuestionDetail from "@/components/question/QuestionDetail";

const QuestionPage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>質問詳細ページ</h1>
      <QuestionDetail />
    </div>
  );
};

export default QuestionPage;
