import React from "react";
import { Conversation } from "../models/types";
import { useTheme } from "../utils/ThemeContext";

interface ChatHistoryProps {
  history: Conversation[];
  loadConversation: (conversationId: string) => void; // fonction de chargement
  newConversation: () => void; // fonction pour créer une nouvelle conversation
  currentConversationId: string | null; // Ajout de l'ID de la conversation actuelle
  deleteConversation: (conversationId: string) => void; // Fonction pour supprimer une conversation
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  history,
  loadConversation,
  newConversation,
  currentConversationId,
  deleteConversation,
}) => {
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex justify-between items-center	mb-8 mx-2">
        <h3>Chat History</h3>
        <button
          onClick={newConversation}
          className={`new-conversation-btn font-bold py-2 px-2 rounded-full transition duration-300 ${
            theme === "dark" ? "bg-gray-300" : "bg-gray-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={theme === "dark" ? "#000000" : "#FFFFFF"}
          >
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </button>
      </div>

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
