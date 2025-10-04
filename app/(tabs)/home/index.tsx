import { Home } from "@/components/screens/Home";
import { HeaderButton } from "@/components/ui/HeaderButtons/HeaderButton";
import { Stack, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HeaderButton
              imageProps={{ systemName: "plus" }}
              buttonProps={{
                onPress: () => {
                  router.push("/(new)/create-tattoo");
                },
                variant: "glass",
              }}
            />
          ),
        }}
      />
      <Home />
    </>
  );
}
