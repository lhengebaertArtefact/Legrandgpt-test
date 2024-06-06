const API_URL = "http://localhost:4000/conversations";

export interface Message {
  role: string;
  content: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
}

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

    // Retourner une réponse simulée (vous pouvez adapter cette partie selon vos besoins)
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
  role: string,
  content: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const conversation: Conversation = await response.json();
    conversation.messages.push({ role, content });

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
