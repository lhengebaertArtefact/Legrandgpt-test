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
          className={`mb-2 p-8 rounded-[50px] max-w-4xl text-2xl ${
            msg.user === "User"
              ? "bg-neutral-700 self-end"
              : "bg-neutral-500 self-start"
          }`}
        >
          <strong>{msg.user} :</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
