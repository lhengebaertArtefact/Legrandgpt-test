"use client";
import LoginForm from "./components/authentication/LoginForm";
import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindows";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChatHistory, Conversation } from "./services/chatgptApi";

export default function Home() {
  const router = useRouter();

  const [history, setHistory] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | undefined
  >(undefined);

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

  const loadConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  return (
    <main className="flex min-h-screen">
      {/* sidebar */}
      <div className="w-1/4 border-r p-4">
        <ChatHistory history={history} loadConversation={loadConversation} />
      </div>
      {/* Chatbot */}
      <div className="flex-1 p-4">
        <ChatWindow conversationId={currentConversationId} />
      </div>
    </main>
  );
}

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     router.push("/dashboard");
//   }
// }, []);
