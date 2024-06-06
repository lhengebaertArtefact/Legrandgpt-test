"use client";
import LoginForm from "./components/authentication/LoginForm";
import ChatHistory from "./components/ChatHistory";
import ChatWindows from "./components/ChatWindows";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChatHistory, Conversation } from "./services/chatgptApi";

export default function Home() {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     router.push("/dashboard");
  //   }
  // }, []);
  const router = useRouter();

  const [history, setHistory] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const data = await getChatHistory();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 border">
      {/* <LoginForm /> */}
      <ChatWindows />
      <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ccc" }}>
        <ChatHistory history={history} />
      </div>
    </main>
  );
}
