import { createContext, useState } from "react";
import { Toast } from "../components/Toast";

interface ToastContextData {
  showToast: (message: string, type: TypeMessage) => void;
}

type TypeMessage = "DEFAULT" | "SUCCESS";

interface ToastProviderProps {
  children: React.ReactNode;
}

export interface MessagesProps {
  message: string;
  type: TypeMessage;
}

export const ToastContext = createContext({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps) {
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const showToast = (newMessage: string, type: TypeMessage) => {
    const message: MessagesProps = {
      message: newMessage,
      type,
    };

    setMessages((oldMessages) => [...oldMessages, message]);
    setTimeout(() => {
      hideToast();
    }, 2000);
  };
  const hideToast = () => {
    setMessages((oldMessages) => oldMessages.slice(1));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {messages.length > 0 && (
        <Toast messages={messages} hideToast={hideToast} />
      )}
    </ToastContext.Provider>
  );
}
