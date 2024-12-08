"use client";
import { useState } from "react";

export default function Home() {
  // 接続テスト
  const [message, setMessage] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/test");
      const data = await response.json();
      console.log(data);
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("エラーが発生しました");
    }
  };

  return (
    <div>
      <h1>接続テスト</h1>
      <button onClick={fetchData}>apiを叩く</button>
      {message && <p>{message}</p>}
    </div>
  );
}
