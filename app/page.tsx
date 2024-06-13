"use client";
import LoginForm from "./components/authentication/LoginForm";
import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindows";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getChatHistory,
  Conversation,
  createNewConversation,
  deleteConversation,
} from "./services/chatgptApi";

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

  const newConversation = async () => {
    try {
      const newConv = await createNewConversation();
      setHistory([...history, newConv]);
      setCurrentConversationId(newConv.id);
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await deleteConversation(conversationId);
      setHistory(history.filter((conv) => conv.id !== conversationId));
      if (currentConversationId === conversationId) {
        setCurrentConversationId(undefined);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Barre latérale */}
      <div className="w-1/4 border-r p-4">
        <ChatHistory
          history={history}
          loadConversation={loadConversation}
          newConversation={newConversation}
          deleteConversation={handleDeleteConversation} // Passer handleDeleteConversation
          currentConversationId={currentConversationId} // Passer currentConversationId
        />
      </div>
      {/* Chatbot */}
      <div className="flex-1 p-4">
        {currentConversationId ? (
          <ChatWindow conversationId={currentConversationId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Sélectionnez ou créez une nouvelle conversation pour commencer.
          </div>
        )}
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
