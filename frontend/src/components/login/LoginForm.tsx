"use client";
import { useState } from "react";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("ID:", id);
    console.log("パスワード:", password);
  };

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-xl">ID</label>
        <input
          className="text-xl border-2 rounded p-3"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xl">パスワード</label>
        <input
          type="password"
          className="text-xl border-2 rounded p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-xl text-main-100 bg-main-500 rounded px-4 py-2"
        >
          ログイン
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
