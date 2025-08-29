import { StyleSheet, View } from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useState } from "react";

export default function Home() {
  const [searchInput, setSeatchInput] = useState("");

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Input
            placeholder="Procurando algum carro?"
            value={searchInput}
            onChangeText={setSeatchInput}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f3f5f8",
    flex: 1,
    paddingHorizontal: 14,
  },
  inputArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 14,
    padding: 8,
    width: "100%",
  },
});
