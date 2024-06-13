"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Message } from "../models/types";

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
          className={`mb-8 p-4 rounded-[50px] max-w-4xl text-lg ${
            msg.speaker === "User"
              ? "bg-neutral-700 self-end shadow-xl shadow-slate-950"
              : "bg-neutral-500 self-start shadow-lg shadow-slate-500"
          }`}
          initial={
            msg.speaker === "User"
              ? { x: 200, opacity: 0 }
              : { x: -200, opacity: 0 }
          }
          animate={{ x: 0, opacity: 1 }}
          transition={
            msg.speaker !== "User"
              ? { delay: 1, type: "spring", stiffness: 100 }
              : { delay: 0, type: "spring", stiffness: 100 }
          }
        >
          <strong>{msg.speaker} :</strong> {msg.text}
          <div ref={messagesEndRef} />
        </motion.div>
      ))}
    </div>
  );
};

export default MessageList;
