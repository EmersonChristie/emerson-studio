// contexts/ChatContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  isChatVisible: boolean;
  setChatVisible: (visible: boolean) => void;
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  return (
    <ChatContext.Provider
      value={{ isChatVisible, setChatVisible, isLoaded, setLoaded }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
