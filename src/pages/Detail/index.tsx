import { RouteProp, useRoute } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { CarDetailProps } from "../../@types/cars.type";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RouteDetailParams = {
  Detail: {
    id: string;
  };
};

type DetailRouteProps = RouteProp<RouteDetailParams, "Detail">;

export default function Detail() {
  const route = useRoute<DetailRouteProps>();
  const [car, setCar] = useState<CarDetailProps>();

  useEffect(() => {
    async function loadCar() {
      if (!route.params.id) return;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadCar();
  }, [route.params.id]);

  return (
    <View style={styles.container}>
      <Text>Tela de detail {route.params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
});
