"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
        <motion.div
          key={index}
          className={`mb-2 p-8 rounded-[50px] max-w-4xl text-2xl ${
            msg.user === "User"
              ? "bg-neutral-700 self-end shadow-xl shadow-slate-950"
              : "bg-neutral-500 self-start shadow-xl shadow-slate-500"
          }`}
          initial={
            msg.user === "User"
              ? { x: 200, opacity: 0 }
              : { x: -200, opacity: 0 }
          }
          animate={{ x: 0, opacity: 1 }}
        >
          <strong>{msg.user} :</strong> {msg.text}
          <div ref={messagesEndRef} />
        </motion.div>
      ))}
    </div>
  );
};

export default MessageList;
