import { Dimensions, Image, StyleSheet } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

export function Banner({ url }: { url: string }) {
  return (
    <Image source={{ uri: url }} style={styles.cover} resizeMode="cover" />
  );
}

const styles = StyleSheet.create({
  cover: {
    borderRadius: 8,
    height: 330,
    marginHorizontal: 6,
    marginTop: 8,
    width: WIDTH / 1.2,
  },
});
