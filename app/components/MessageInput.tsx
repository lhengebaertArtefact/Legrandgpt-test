"use client";
import React, { useState } from "react";
import { Message } from "../models/types";

interface MessageInputProps {
  addMessage: (message: Message) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ addMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Appeler addMessage avec le message de l'utilisateur
    addMessage({ speaker: "User", text: input });
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0 left-0 right-0 p-4 m-4 bg-stone-700 flex rounded-[50px]"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow text-lg text-white bg-stone-700 focus:outline-none focus:ring-0"
        placeholder="Type your message..."
      />
      <button type="submit" className="text-white ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
