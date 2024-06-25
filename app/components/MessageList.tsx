"use client";
import React, { useEffect, useRef, useState } from "react";
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200); // Supprimer la classe 200 ms après la fin du défilement
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-grow overflow-y-auto p-2"
      style={{
        maxHeight: "100%",
        maskImage: isScrolling
          ? "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
          : "",
        transition:
          "mask-image 0.2s ease-in-out, -webkit-mask-image 0.2s ease-in-out",
      }}
    >
      <div className="flex flex-col mb-4 pb-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`mb-8 p-4 rounded-[50px] max-w-4xl text-lg ${
              msg.speaker === "User"
                ? "bg-neutral-700 self-end shadow-xl shadow-slate-950"
                : "bg-neutral-500 self-start shadow-lg shadow-slate-500"
            }`}
            initial={
              msg.isNew
                ? msg.speaker === "User"
                  ? { x: 200, opacity: 0 }
                  : { x: -200, opacity: 0 }
                : {}
            }
            animate={msg.isNew ? { x: 0, opacity: 1 } : {}}
            transition={
              msg.isNew
                ? msg.speaker !== "User"
                  ? { delay: 1, type: "spring", stiffness: 100 }
                  : { delay: 0, type: "spring", stiffness: 100 }
                : {}
            }
          >
            <strong>{msg.speaker} :</strong> {msg.text}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
