import LoginForm from "../../components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 max-w-[400px] bg-white p-12 rounded shadow-md">
        <h2 className="text-3xl">ログイン</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
