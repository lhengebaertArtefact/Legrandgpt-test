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

export default function Home() {
  const router = useRouter();

  const [history, setHistory] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);

  useEffect(() => {
    fetchData();
  }, [currentConversationId]);

  const fetchData = async () => {
    try {
      const data = await getChatHistory();
      setHistory(data);
      if (currentConversationId) {
        const conversation = data.find(
          (conv) => conv.id === currentConversationId
        );
        if (conversation) {
          setMessages(
            conversation.messages.map((msg) => ({
              speaker: msg.speaker === USER_ROLE ? USER_NAME : ASSISTANT_NAME,
              text: msg.text,
            }))
          );
        } else {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages([]);
    }
  };

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
        setCurrentConversationId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const addMessage = async (message: { speaker: string; text: string }) => {
    if (currentConversationId) {
      setMessages((prevMessages) => [...prevMessages, message]);
      await addMessageToConversation(
        currentConversationId,
        USER_ROLE,
        message.text
      );

      const response = await sendMessageToChatGPT(message.text);
      const botMessage = { speaker: ASSISTANT_NAME, text: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      await addMessageToConversation(
        currentConversationId,
        ASSISTANT_ROLE,
        response
      );
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
          deleteConversation={handleDeleteConversation}
          currentConversationId={currentConversationId}
        />
      </div>
      {/* Chatbot */}
      <div className="flex-1 p-4">
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
