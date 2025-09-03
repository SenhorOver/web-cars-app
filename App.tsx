import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import { StatusBar } from "react-native";
import { ToastProvider } from "./src/contexts/ToastContext";

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <StatusBar backgroundColor={"#f3f5f8"} barStyle={"dark-content"} />
        <Routes />
      </ToastProvider>
    </NavigationContainer>
  );
}
