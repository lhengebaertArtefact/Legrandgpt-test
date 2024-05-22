"use client";
import React from "react";

interface Message {
  user: string;
  text: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y mb-4 pb-2 flex flex-col">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 p-8 rounded-[50px] max-w-xs text-2xl ${
            msg.user === "User"
              ? "bg-stone-600 self-end"
              : "bg-stone-400 self-start"
          }`}
        >
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
