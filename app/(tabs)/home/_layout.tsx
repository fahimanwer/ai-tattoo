import { Icon } from "@/components/ui/Icon";
import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { TattooCreationProvider } from "@/context/TattooCreationContext";
import { Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

function ButtonToCreateTattoo() {
  const router = useRouter();
  const goToCreateTattoo = () => {
    router.push("/home/new/select-body-part");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable style={{ paddingLeft: 8 }} onPress={goToCreateTattoo}>
        <Icon symbol="plus" color={"#007AFF"} />
      </Pressable>
    </View>
  );
}

export default function ProfileLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <TattooCreationProvider>
      <Stack
        screenOptions={{
          ...largeHeaderOptions,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Get Inspired",
            headerLargeTitle: true,
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => <ButtonToCreateTattoo />,
          }}
        />
        <Stack.Screen
          name="new/select-body-part"
          options={{
            title: "Create Your Tattoo",
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="new/select-tattoo"
          options={{
            title: "Select Tattoo Style",
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="new/add-details"
          options={{
            title: "Add Details",
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="choose-photo"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="generated-result"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="tattoo-result"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="about/style"
          options={{
            title: "",
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="body-part"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="about/learn-more"
          options={{
            headerLargeTitle: true,
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.3, 0.5, 1],
            sheetInitialDetentIndex: 0,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Stack.Screen
          name="about/photo"
          options={{
            headerLargeTitle: true,
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.3, 0.5, 1],
            sheetInitialDetentIndex: 0,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack>
    </TattooCreationProvider>
  );
}
