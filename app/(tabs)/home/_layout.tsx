import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { TattooCreationProvider } from "@/context/TattooCreationContext";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

function ButtonToCreateTattoo() {
  const router = useRouter();
  const goToCreateTattoo = () => {
    router.push("/home/new/select-body-part");
  };

  return (
    <>
      <GlassContainer spacing={10} style={styles.containerStyle}>
        <GlassView style={styles.glass1} isInteractive />
        <GlassView style={styles.glass2} />
        <GlassView style={styles.glass3} />
      </GlassContainer>
      {/* <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable style={{ paddingLeft: 8 }} onPress={goToCreateTattoo}>
        <Icon symbol="plus" color={"#007AFF"} />
      </Pressable>
    </View> */}
    </>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  containerStyle: {
    position: "absolute",
    top: 200,
    left: 50,
    width: 250,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  glass1: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  glass2: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  glass3: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
