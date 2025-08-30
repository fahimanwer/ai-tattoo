import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#111111",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#ffffff",
          },
          headerTintColor: "#ffffff",
        }}
      >
        <Stack.Screen
          name="(web)/index"
          options={{
            title: "AI Tattoo Try On",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            title: "Privacy Policy",
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            title: "Terms of Service",
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
