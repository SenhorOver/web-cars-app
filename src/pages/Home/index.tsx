import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const debounce = (
    func: (...args: string[]) => Promise<void>,
    delay: number,
  ) => {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: string[]) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        func(...args);
      }, delay);
    };
  };

  function handleInputChange(text: string) {
    setSeatchInput(text);
    delayedApiCall(text);
  }

  const delayedApiCall = useCallback(
    debounce(async (newText: string) => await fetchSearchCar(newText), 800),
    [],
  );

  async function fetchSearchCar(newText: string) {
    if (newText === "") {
      await loadCars();
      setSeatchInput("");
      return;
    }

    try {
      setCars([]);
      const q = query(
        collection(db, "cars"),
        where("name", ">=", newText.toUpperCase()),
        where("name", "<=", newText.toUpperCase() + "\uf8ff"),
      );
      const querySnapshot = await getDocs(q);

      const listCars: CarsProps[] = [];

      querySnapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          city: doc.data().city as string,
          year: doc.data().year as string,
          km: doc.data().km as string,
          name: doc.data().name as string,
          price: doc.data().price as string,
          uid: doc.data().uid as string,
          images: doc.data().images as CarImageProps[],
        });
      });

      setCars(listCars);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
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
            onChangeText={(text) => handleInputChange(text)}
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
