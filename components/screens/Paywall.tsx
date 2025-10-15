import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Purchases from "react-native-purchases";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";

export function Paywall() {
  const fetchProducts = async () => {
    const products = await Purchases.getProducts([
      "main_ai_tattoo_plus",
      "main_ai_tattoo_pro",
      "main_ai_tattoo_starter",
    ]);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Subscription",
          headerLeft: () => (
            <HeaderButton
              imageProps={{ systemName: "xmark" }}
              buttonProps={{ onPress: () => router.back() }}
            />
          ),
        }}
      />
      <View></View>
    </>
  );
}
