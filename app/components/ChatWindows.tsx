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
    <div className="w-full h-full flex flex-col flex-grow relative bg-neutral-800 pb-[50px] overflow-hidden">
      <div className="flex-grow overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <div className="p-4 bg-neutral-800">
        <MessageInput addMessage={addMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
