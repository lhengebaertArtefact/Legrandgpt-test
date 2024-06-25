"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getChatHistory,
  createNewConversation,
  deleteConversation,
  addMessageToConversation,
  sendMessageToChatGPT,
} from "./services/chatgptApi";
import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindows";
import {
  USER_ROLE,
  ASSISTANT_ROLE,
  USER_NAME,
  ASSISTANT_NAME,
  DEFAULT_MESSAGE_TEXT,
  DEFAULT_MESSAGES,
} from "./models/constants";
import { Conversation, Message } from "./models/types";
import ScrollTest from "./components/ScrollTest";

export default function Home() {
  const router = useRouter();

  const [history, setHistory] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getChatHistory();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHistory();
  }, []);

  const loadConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    const conversation = history.find((conv) => conv.id === conversationId);
    if (conversation) {
      setMessages(
        conversation.messages.map((msg) => ({
          speaker: msg.speaker === USER_ROLE ? USER_NAME : ASSISTANT_NAME,
          text: msg.text,
          isNew: false, // Marquer les messages existants comme non nouveaux
        }))
      );
    } else {
      setMessages([]);
    }
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
        setCurrentConversationId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const addMessage = async (message: Message) => {
    try {
      if (currentConversationId) {
        await addMessageToConversation(
          currentConversationId,
          USER_ROLE,
          message.text
        );
        const newMessage = { ...message, isNew: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const response = await sendMessageToChatGPT(message.text);
        const botMessage = {
          speaker: ASSISTANT_NAME,
          text: response,
          isNew: true,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        await addMessageToConversation(
          currentConversationId,
          ASSISTANT_ROLE,
          response
        );
      }
    } catch (error) {
      console.error("error adding message", error);
    }
  };

  return (
    <main className="flex h-[calc(100vh-65px)] overflow-hidden">
      {/* Barre latérale */}
      <div className="w-1/4 border-r p-4 overflow-y-auto h-full">
        <ChatHistory
          history={history}
          loadConversation={loadConversation}
          newConversation={newConversation}
          deleteConversation={handleDeleteConversation}
          currentConversationId={currentConversationId}
        />
      </div>
      {/* Chatbot */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {currentConversationId ? (
          <ChatWindow messages={messages} addMessage={addMessage} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {DEFAULT_MESSAGE_TEXT}
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
