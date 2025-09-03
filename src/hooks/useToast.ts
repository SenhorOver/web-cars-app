import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
