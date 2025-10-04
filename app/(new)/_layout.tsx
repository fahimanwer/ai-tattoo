import { Text } from "@/components/ui/Text";
import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

function ButtonToCreateTattoo() {
  const goToCreateTattoo = () => {
    /* router.push("/(new)/select-body-part"); */
  };

  return (
    <Pressable
      onPress={goToCreateTattoo}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 8,
      }}
    >
      <Text>Generate Tattoo</Text>
    </Pressable>
  );
}

export default function ProfileLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
      }}
    >
      <Stack.Screen
        name="select-body-part"
        options={{
          title: "Select Body Part",
          headerLargeTitle: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="select-tattoo"
        options={{
          title: "Select Tattoo Style",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="add-details"
        options={{
          title: "Add Details",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="create-tattoo"
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
          headerRight: () => <ButtonToCreateTattoo />,
        }}
      />
    </Stack>
  );
}
