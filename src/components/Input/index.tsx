import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    padding: 6,
  },
});
