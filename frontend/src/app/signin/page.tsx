import Link from "next/link";
import SigninForm from "@/components/login/SigninForm";

const SigninPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <div className="flex flex-col justify-center items-center w-1/2 max-w-[400px] bg-white p-12 rounded shadow-md">
        <h2 className="text-3xl">ログイン</h2>
        <SigninForm />
        <Link href="/signup" className="border-b-2 mt-6">
          新規登録はこちら
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;
