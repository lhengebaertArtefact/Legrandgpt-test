export interface Message {
    speaker: string;
    text: string;
    isNew?: boolean;

  }
  
  export interface Conversation {
    id: string;
    messages: Message[];
  }
  