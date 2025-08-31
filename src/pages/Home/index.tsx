import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { CarImageProps, CarsProps } from "../../@types/cars.type";
import { CarItem } from "../../components/CarList";

export default function Home() {
  const [searchInput, setSeatchInput] = useState("");
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadCars();
  }, []);

  async function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));
    try {
      const snapshot = await getDocs(queryRef);
      const listCars: CarsProps[] = [];
      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          city: doc.data().city as string,
          km: doc.data().km as string,
          name: doc.data().name as string,
          price: doc.data().price as string | number,
          uid: doc.data().uid as string,
          year: doc.data().year as string,
          images: doc.data().images as CarImageProps[],
        });
      });
      setCars(listCars);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

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
        <View>
          {loading && (
            <ActivityIndicator
              style={styles.loading}
              size={"large"}
              color={"#000"}
            />
          )}

          <FlatList
            key={`flatlist-${2}`}
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CarItem
                data={item}
                widthScreen={cars.length <= 1 ? "100%" : "49%"}
              />
            )}
            style={styles.list}
            numColumns={2}
            columnWrapperStyle={styles.flatlistColumnWrapper}
            contentContainerStyle={styles.flatlistContentContainer}
            showsVerticalScrollIndicator={false}
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
    flex: 0.98,
    marginBottom: 100,
    paddingHorizontal: 14,
  },
  flatlistColumnWrapper: {
    justifyContent: "space-between",
  },
  flatlistContentContainer: {
    paddingBottom: 14,
  },
  inputArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 14,
    padding: 8,
    width: "100%",
  },
  list: {
    flex: 0.98,
    marginTop: 4,
    paddingTop: 14,
  },
  loading: {
    marginTop: 14,
  },
});
