import React from "react";

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  messages: Message[];
}

interface ChatHistoryProps {
  history: Conversation[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div>
      <h3>Chat History</h3>
      {history.map((conversation) => (
        <div key={conversation.id}>
          <p>
            <strong>Conversation {conversation.id}</strong>
          </p>
          {conversation.messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.role}</strong>: {msg.content}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
