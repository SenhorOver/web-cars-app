import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CarsProps } from "../../@types/cars.type";
import { CarItem } from "../../components/CarList";
import useStorage from "../../hooks/useStorage";
import { useToast } from "../../hooks/useToast";

export default function Favorites() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarsProps[]>([]);
  const { getItem, removeItem } = useStorage();
  const { showToast } = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteCars() {
      const listCars = await getItem();
      setCars(listCars);
    }

    void loadFavoriteCars();
  }, [isFocused]);

  async function handleRemoveCar(id: string) {
    const newCarList = await removeItem(id);
    setCars(newCarList);
    showToast("Carro removido dos favoritos!", "DEFAULT");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={32} color={"#000"} />
        </Pressable>

        <Text style={styles.title}>Meus Favoritos</Text>
      </View>

      <FlatList
        style={styles.list}
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarItem
            data={item}
            widthScreen={"100%"}
            enableRemove
            removeItem={() => handleRemoveCar(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f5f8",
    flex: 1,
    paddingHorizontal: 14,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
    paddingVertical: 8,
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14,
  },
  listContainerStyle: {
    paddingBottom: 14,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
});
