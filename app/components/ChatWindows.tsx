"use client";
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  sendMessageToChatGPT,
  addMessageToConversation,
} from "../services/chatgptApi";

interface Message {
  user: string;
  text: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("1");

  const addMessage = async (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    await addMessageToConversation(currentConversationId, "user", message.text);

    const response = await sendMessageToChatGPT(message.text);
    const botMessage = { user: "ChatGPT", text: response };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    await addMessageToConversation(
      currentConversationId,
      "assistant",
      response
    );
  };

  return (
    <div className="w-3/5 mx-auto p-4 flex flex-col flex-grow relative bg-neutral-800 pb-[200px]">
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
