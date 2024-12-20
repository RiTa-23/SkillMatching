"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SigninSchema = z.object({
  id: z.string().min(1, "IDを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

type SigninFormData = z.infer<typeof SigninSchema>;

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
  });

  const submit = (data: { id: string; password: string }) => {
    console.log(data);
  };

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col">
        <label className="text-xl">ID</label>
        <input className="text-xl border-2 rounded p-3" {...register("id")} />
        {errors.id?.message && (
          <p className="text-red-500">{errors.id?.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-xl">パスワード</label>
        <input
          type="password"
          className="text-xl border-2 rounded p-3"
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[100%] max-w-[150px] text-xl text-main-100 bg-main-500 rounded px-4 py-2"
        >
          ログイン
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
