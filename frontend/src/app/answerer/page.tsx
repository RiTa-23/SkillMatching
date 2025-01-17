import AnswerHistory from "@/components/answer/myInfo/AnswerHistory";
import MySkill from "@/components/answer/myInfo/MySkill";

const AnswererDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-[90vh] space-y-4 pt-6">
      <MySkill />
      <AnswerHistory />
    </div>
  );
};

export default AnswererDetailPage;
