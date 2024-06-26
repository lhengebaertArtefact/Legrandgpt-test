import { Conversation } from "../models/types";

const API_URL = "http://localhost:4000/conversations";

export const sendMessageToChatGPT = async (
  message: string
): Promise<string> => {
  try {
    // Simuler une réponse de ChatGPT pour la démonstration
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: Conversation[] = await response.json();

    if (data.length === 0) {
      throw new Error("No mock responses found");
    }

    // Retourner une réponse mock de chatgpt
    return "This is a mock response from ChatGPT.";
  } catch (error) {
    console.error("Error communicating with mock API:", error);
    throw error;
  }
};

export const getChatHistory = async (): Promise<Conversation[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: Conversation[] = await response.json();

    if (data.length === 0) {
      throw new Error("No conversations found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};

export const addMessageToConversation = async (
  conversationId: string,
  speaker: string,
  text: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const conversation: Conversation = await response.json();
    conversation.messages.push({ speaker, text });

    await fetch(`${API_URL}/${conversationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversation),
    });
  } catch (error) {
    console.error("Error adding message to conversation:", error);
    throw error;
  }
};

export const createNewConversation = async (): Promise<Conversation> => {
  try {
    const newConv = {
      id: new Date().getTime().toString(), // Utiliser un timestamp comme ID unique
      messages: [],
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newConv),
    });

    if (!response.ok) {
      throw new Error("Failed to create new conversation");
    }

    return newConv;
  } catch (error) {
    console.error("Error creating new conversation:", error);
    throw error;
  }
};

export const deleteConversation = async (
  conversationId: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${conversationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete conversation");
    }
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};
