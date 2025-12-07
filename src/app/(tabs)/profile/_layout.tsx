import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { router, Stack } from "expo-router";

export default function HomeLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
        headerLargeTitle: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          unstable_headerLeftItems: (props) => [
            {
              type: "button",
              label: "Back",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: () => {
                router.back();
              },
            },
          ],
        }}
      />
    </Stack>
  );
}
