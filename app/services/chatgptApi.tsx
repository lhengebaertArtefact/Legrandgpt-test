const API_URL = "http://localhost:4000/responses";
const API_KEY = ""; // Clé API non nécessaire pour json-server

interface MockResponse {
  id: number;
  message: {
    role: string;
    content: string;
  };
}

export const sendMessageToChatGPT = async (
  message: string
): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: MockResponse[] = await response.json();

    if (data.length === 0) {
      throw new Error("No mock responses found");
    }

    return data[0].message.content;
  } catch (error) {
    console.error("Error communicating with mock API:", error);
    throw error;
  }
};
