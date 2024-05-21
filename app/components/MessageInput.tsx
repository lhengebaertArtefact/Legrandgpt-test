"use client";
import React, { useState } from "react";

interface MessageInputProps {
  addMessage: (message: { user: string; text: string }) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ addMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Appeler addMessage avec le message de l'utilisateur
    addMessage({ user: "User", text: input });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow border p-2 text-black"
        placeholder="Type your message..."
      />
      <button type="submit" className="p-2 bg-blue-500 text-white">
        Envoyer
      </button>
    </form>
  );
};

export default MessageInput;
