import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarsProps } from "../@types/cars.type";

const key = "@webcars";

const useStorage = () => {
  const getItem = async (): Promise<CarsProps[]> => {
    try {
      const cars = await AsyncStorage.getItem(key);
      if (cars !== null) {
        return JSON.parse(cars) as CarsProps[];
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const saveItem = async (newCar: CarsProps) => {
    try {
      const cars = await getItem();

      const findCar = cars.find((car) => car.id === newCar.id);
      if (findCar) return;

      cars.push(newCar);

      await AsyncStorage.setItem(key, JSON.stringify(cars));
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id: string): Promise<CarsProps[] | []> => {
    try {
      const cars = await getItem();
      const updatedCarList = cars.filter((car) => car.id !== id);
      await AsyncStorage.setItem(key, JSON.stringify(updatedCarList));
      return updatedCarList;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
