import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";

export function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function handleNavigateFavorite() {
    navigation.navigate("Favorites");
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Image source={logo as ImageSourcePropType} />
      <Pressable style={styles.button}>
        <Feather
          name="bookmark"
          size={24}
          color={"#fff"}
          onPress={handleNavigateFavorite}
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: "50%",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#f3f5f8",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 14,
  },
});
