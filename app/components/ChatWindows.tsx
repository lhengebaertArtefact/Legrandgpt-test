import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Message } from "../models/types";

interface ChatWindowProps {
  messages: Message[];
  addMessage: (message: Message) => Promise<void>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, addMessage }) => {
  return (
    <div className="w-full mx-auto p-4 flex flex-col flex-grow relative bg-neutral-800 pb-[200px]">
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
