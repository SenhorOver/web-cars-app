/* eslint-disable @typescript-eslint/no-misused-promises */
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { CarDetailProps, CarImageProps } from "../../@types/cars.type";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { BannerList } from "./components/Bannerlist";
import { Label } from "./components/Label";
import * as Linking from "expo-linking";
import { ModalBanner } from "./components/Modal";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RouteDetailParams = {
  Detail: {
    id: string;
  };
};

type DetailRouteProps = RouteProp<RouteDetailParams, "Detail">;

export default function Detail() {
  const route = useRoute<DetailRouteProps>();
  const navigation = useNavigation();
  const [car, setCar] = useState<CarDetailProps>();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function loadCar() {
      if (!route.params.id) {
        navigation.goBack();
        return;
      }

      try {
        const docRef = doc(db, "cars", route.params.id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.data()) {
          navigation.goBack();
        }

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name as string,
          year: snapshot.data()?.year as string,
          city: snapshot.data()?.city as string,
          model: snapshot.data()?.model as string,
          uid: snapshot.data()?.uid as string,
          created: snapshot.data()?.created as string,
          description: snapshot.data()?.description as string,
          images: snapshot.data()?.images as CarImageProps[],
          km: snapshot.data()?.km as string,
          owner: snapshot.data()?.owner as string,
          price: snapshot.data()?.price as string,
          whatsapp: snapshot.data()?.whatsapp as string,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadCar();
  }, [route.params.id]);

  async function handleCallPhone() {
    await Linking.openURL(`tel:${car?.whatsapp}`);
  }

  function handleOpenImage(imageUrl: string) {
    setModalVisible(true);
    setSelectedImage(imageUrl);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedImage("");
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size={"large"} color={"#000"} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.container}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={36} color={"#000"} />
            </Pressable>

            {car?.images && (
              <BannerList
                images={car?.images}
                handleOpenImage={(imageUrl) => handleOpenImage(imageUrl)}
              />
            )}

            <View style={styles.header}>
              <Pressable style={styles.saveContent}>
                <Feather size={22} color={"#fff"} name="bookmark" />
              </Pressable>

              <Text style={styles.title}>{car?.name}</Text>
              <Text>{car?.model}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.price}>R$ {car?.price}</Text>

              <View style={styles.labels}>
                <Label label="Cidade" name={car?.city} />
                <Label label="Ano" name={car?.year} />
              </View>

              <View style={styles.labels}>
                <Label label="KM Rodados" name={car?.km} />
                <Label label="Telefone" name={car?.whatsapp} />
              </View>
              <Text style={styles.description}>Descrição</Text>
              <View style={styles.descriptionArea}>
                <Text style={styles.descriptionText}>{car?.description}</Text>
              </View>

              <Pressable style={styles.callButton} onPress={handleCallPhone}>
                <Text style={styles.callText}>Conversar com vendedor</Text>
              </Pressable>
            </View>
            <Modal visible={modalVisible} transparent>
              <ModalBanner
                closeModal={handleCloseModal}
                imageUrl={selectedImage}
              />
            </Modal>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "50%",
    height: 52,
    justifyContent: "center",
    left: 24,
    position: "absolute",
    top: 44,
    width: 52,
    zIndex: 99,
  },
  callButton: {
    alignItems: "center",
    backgroundColor: "#08c168",
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 14,
    marginTop: 14,
    padding: 8,
    width: "100%",
  },
  callText: {
    fontSize: 16,
    fontWeight: 500,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#f3f5f8",
    flex: 1,
    paddingBottom: 16,
  },
  content: {
    alignSelf: "flex-start",
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
  },
  description: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 14,
  },
  descriptionArea: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 4,
  },
  descriptionText: {
    lineHeight: 20,
  },
  header: {
    backgroundColor: "#fff",
    borderRadius: 8,
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 14,
    position: "relative",
    top: -34,
    width: "90%",
    zIndex: 99,
  },
  labels: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 24,
    marginTop: 14,
  },
  loading: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  price: {
    color: "#000",
    fontSize: 26,
    fontWeight: "bold",
  },
  saveContent: {
    alignItems: "center",
    backgroundColor: "#ef4444",
    borderRadius: "50%",
    justifyContent: "center",
    padding: 12,
    position: "absolute",
    right: 8,
    top: -24,
    zIndex: 99,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
