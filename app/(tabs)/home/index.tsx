import { Home } from "@/components/screens/Home";
import { HomeContextMenu } from "@/components/ui/HeaderButtons/HomeContextMenu";
import { Stack } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <HomeContextMenu />,
        }}
      />
      <Home />
    </>
  );
}
