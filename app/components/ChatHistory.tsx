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
  loadConversation: (conversationId: string) => void; // Ajout de la fonction de chargement
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  history,
  loadConversation,
}) => {
  return (
    <div>
      <h3>Chat History</h3>
      {history.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => loadConversation(conversation.id)}
          className="cursor-pointer"
        >
          <p>
            <strong>Conversation {conversation.id}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
