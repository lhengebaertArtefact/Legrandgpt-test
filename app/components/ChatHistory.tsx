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
  loadConversation: (conversationId: string) => void; // fonction de chargement
  newConversation: () => void; // fonction pour créer une nouvelle conversation
  currentConversationId?: string; // Ajout de l'ID de la conversation actuelle
  deleteConversation: (conversationId: string) => void; // Fonction pour supprimer une conversation
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  history,
  loadConversation,
  newConversation,
  currentConversationId,
  deleteConversation,
}) => {
  return (
    <div>
      <h3>Chat History</h3>
      <button
        onClick={newConversation}
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg w-full"
      >
        Nouvelle conversation
      </button>
      {history.map((conversation) => (
        <div
          key={conversation.id}
          className={`flex justify-between items-center cursor-pointer p-2 rounded-lg mb-2 ${
            conversation.id === currentConversationId
              ? "bg-blue-100"
              : "hover:bg-gray-200"
          }`}
        >
          <div onClick={() => loadConversation(conversation.id)}>
            <p>
              <strong>Conversation {conversation.id}</strong>
            </p>
          </div>
          <button
            onClick={() => deleteConversation(conversation.id)}
            className="text-gray-500 hover:text-gray-700 px-2 rounded-full hover:bg-gray-300"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
