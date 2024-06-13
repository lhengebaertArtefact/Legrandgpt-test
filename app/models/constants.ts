interface Message {
    speaker: string;
    text: string;
  }

export const USER_ROLE = "user";
export const ASSISTANT_ROLE = "assistant";
export const USER_NAME = "User";
export const ASSISTANT_NAME = "ChatGPT";
export const DEFAULT_MESSAGE_TEXT =
  "Sélectionnez ou créez une nouvelle conversation pour commencer.";
export const DEFAULT_MESSAGES: Message[] = [];
