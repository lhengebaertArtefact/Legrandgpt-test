"use client";
import React, { useEffect, useRef } from "react";

interface Message {
  user: string;
  text: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow overflow-y mb-4 pb-2 flex flex-col">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 p-8 rounded-[50px] max-w-4xl text-2xl ${
            msg.user === "User"
              ? "bg-neutral-700 self-end"
              : "bg-neutral-500 self-start"
          }`}
        >
          <strong>{msg.user} :</strong> {msg.text}
          <div ref={messagesEndRef} style={{ float: "left", clear: "both" }} />
        </div>
      ))}
    </div>
  );
};

export default MessageList;
