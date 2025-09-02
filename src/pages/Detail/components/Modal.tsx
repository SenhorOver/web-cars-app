import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ModalBannerProps {
  closeModal: () => void;
  imageUrl: string;
}

const { height: HEIGHT } = Dimensions.get("screen");

export function ModalBanner({ closeModal, imageUrl }: ModalBannerProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.buttonText}>Fechar</Text>
      </Pressable>
      <TouchableWithoutFeedback>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    justifyContent: "center",
    padding: 8,
    paddingLeft: 14,
    paddingRight: 14,
    position: "absolute",
    top: HEIGHT / 6,
    zIndex: 99,
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    width: "100%",
  },
});
