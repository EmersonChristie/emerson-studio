// contexts/ChatContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  isChatVisible: boolean;
  setChatVisible: (visible: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatVisible, setChatVisible] = useState(false);

  return (
    <ChatContext.Provider value={{ isChatVisible, setChatVisible }}>
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
