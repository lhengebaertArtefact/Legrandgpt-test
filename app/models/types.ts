export interface Message {
    speaker: string;
    text: string;
  }
  
  export interface Conversation {
    id: string;
    messages: Message[];
  }
  