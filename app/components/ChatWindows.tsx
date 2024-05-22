"use client";
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { sendMessageToChatGPT } from "../services/chatgptApi";

interface Message {
  user: string;
  text: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = async (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    const response = await sendMessageToChatGPT(message.text);
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "ChatGPT", text: response },
    ]);
  };

  return (
    <div className="w-3/5 mx-auto border p-4 flex flex-col flex-grow relative bg-neutral-800">
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
