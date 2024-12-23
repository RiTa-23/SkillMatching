import AnswerHistory from "@/components/answer/myInfo/AnswerHistory";
import MySkill from "@/components/answer/myInfo/MySkill";

const AnswererDetailPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh] space-y-4">
      <MySkill />
      <AnswerHistory />
    </div>
  );
};

export default AnswererDetailPage;
