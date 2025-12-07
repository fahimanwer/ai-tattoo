import { Home } from "@/src/components/screens/Home";
import { Stack, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerRightItems: (props) => [
            {
              type: "button",
              label: "New Tattoo",
              variant: "prominent",
              tintColor: "yellow",
              labelStyle: {
                fontWeight: "bold",
              },
              onPress: () => {
                router.push("/(playground)");
              },
            },
          ],
        }}
      />
      <Home />
    </>
  );
}
