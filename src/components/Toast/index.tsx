import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { MessagesProps } from "../../contexts/ToastContext";
import { useEffect, useRef } from "react";

interface ToastProps {
  messages: MessagesProps[];
  hideToast: () => void;
}

export function Toast({ hideToast, messages }: ToastProps) {
  const opacityAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnimated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [messages]);

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnimated }]}>
      {messages.map((item, index) => (
        <Pressable
          key={index}
          style={[
            styles.toast,
            item.type === "DEFAULT" ? styles.default : styles.success,
          ]}
          onPress={hideToast}
        >
          <Text style={styles.toastText}>{item.message}</Text>
        </Pressable>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 40,
    left: 0,
    marginHorizontal: 14,
    position: "absolute",
    right: 0,
  },
  default: {
    backgroundColor: "rgba(0,0,0,0.89)",
  },
  success: {
    backgroundColor: "rgba(0,184,95,0.89)",
  },
  toast: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
  },
});
