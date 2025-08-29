import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Tela de Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
