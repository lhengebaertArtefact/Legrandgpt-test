import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  sendMessageToChatGPT,
  addMessageToConversation,
  getChatHistory,
} from "../services/chatgptApi";

interface Message {
  user: string;
  text: string;
}

interface ChatWindowProps {
  conversationId?: string; // conversationId est optionnel et peut être undefined
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | undefined
  >(conversationId);

  useEffect(() => {
    setCurrentConversationId(conversationId);
  }, [conversationId]);

  useEffect(() => {
    const fetchConversation = async () => {
      if (currentConversationId) {
        try {
          const history = await getChatHistory();
          const conversation = history.find(
            (conv) => conv.id === currentConversationId
          );
          if (conversation) {
            setMessages(
              conversation.messages.map((msg) => ({
                user: msg.role === "user" ? "User" : "ChatGPT",
                text: msg.content,
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching conversation:", error);
        }
      }
    };

    fetchConversation();
  }, [currentConversationId]);

  const addMessage = async (message: Message) => {
    if (currentConversationId) {
      setMessages((prevMessages) => [...prevMessages, message]);
      await addMessageToConversation(
        currentConversationId,
        "user",
        message.text
      );

      const response = await sendMessageToChatGPT(message.text);
      const botMessage = { user: "ChatGPT", text: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      await addMessageToConversation(
        currentConversationId,
        "assistant",
        response
      );
    }
  };

  return (
    <div className="w-3/5 mx-auto p-4 flex flex-col flex-grow relative bg-neutral-800 pb-[200px]">
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
