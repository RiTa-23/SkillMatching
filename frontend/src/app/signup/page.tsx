import Link from "next/link";
import SignupForm from "@/components/login/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 max-w-[400px] bg-white p-12 rounded shadow-md">
        <h2 className="text-3xl">新規登録</h2>
        <SignupForm />
        <Link href="/signin" className="border-b-2 mt-6">
          ログインはこちら
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
