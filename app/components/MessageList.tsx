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
    <div className="overflow-y mb-4 pb-2">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
