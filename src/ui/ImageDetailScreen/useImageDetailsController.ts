import { useNavigation } from "@react-navigation/core";

export function useImageDetailsController() {
  const navigation = useNavigation();
  
  return {
    navigation,
  }
};