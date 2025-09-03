import {
  DimensionValue,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { CarsProps } from "../../@types/cars.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";

interface CarItemProps {
  data: CarsProps;
  widthScreen: DimensionValue;
  enableRemove?: boolean;
  removeItem?: () => Promise<void>;
}

export function CarItem({
  data,
  widthScreen,
  enableRemove = false,
  removeItem,
}: CarItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function handleNavigate() {
    navigation.navigate("Detail", {
      id: data.id,
    });
  }

  async function handleRemove() {
    if (!removeItem) return;

    await removeItem();
  }

  return (
    <Pressable
      style={[styles.container, { width: widthScreen }]}
      onPress={handleNavigate}
      onLongPress={enableRemove ? handleRemove : () => {}}
    >
      <Image
        style={styles.cover}
        source={{ uri: data.images[0].url }}
        resizeMode="cover"
      />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.text}>
        {data.year} - {data.km} km
      </Text>
      <Text style={[styles.price, styles.largeMargin]}>R$ {data.price}</Text>
      <Text style={styles.divisor} />
      <Text style={[styles.text, styles.smallMargin]}>{data.city}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 14,
    padding: 4,
    width: "100%",
  },
  cover: {
    borderRadius: 4,
    height: 140,
    marginBottom: 8,
    width: "100%",
  },
  divisor: {
    backgroundColor: "#d9d9d9",
    height: 1,
    width: "100%",
  },
  largeMargin: {
    marginTop: 14,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  smallMargin: {
    marginTop: 4,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
