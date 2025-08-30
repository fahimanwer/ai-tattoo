import LinearGradientImageBlur from "@/components/LinearGradientImageBlur";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

import { AuthContext } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

import { use } from "react";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const { setIsAuthenticated } = use(AuthContext);

  return (
    <View style={styles.container}>
      <LinearGradientImageBlur
        // imageUrl="https://res.cloudinary.com/dkr1hluva/image/upload/v1756162154/code-with-beto-assets/starket-kit-bg-1.png"
        imageUrl={require("../../assets/images/model.png")}
        showBlur={false}
        showGradient={true}
      />
      <View style={styles.contentContainer}>
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <Text
            type="9xl"
            variant="poster"
            weight="black"
            style={
              {
                letterSpacing: -10,
              } as any
            }
          >
            AI TATTOO
          </Text>
          <Text
            type="title"
            variant="poster"
            weight="light"
            style={{ opacity: 0.6, lineHeight: 40 } as any}
          >
            Preview virtual tattoos on your body with AI - arm, leg, face & more
          </Text>
          <Button
            title="Sign Up"
            color="neutral"
            variant="solid"
            radius="full"
            size="lg"
            style={{ marginTop: 32 } as any}
            onPress={() => {
              authClient.signUp.email({
                email: "test@test.com",
                password: "abcd1234",
                name: "Beto",
              });
            }}
          />
          <Button
            title="Get started"
            color="neutral"
            variant="solid"
            radius="full"
            size="lg"
            style={{ marginTop: 32 } as any}
            onPress={() => {
              setIsAuthenticated(true);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  contentContainer: {
    position: "absolute",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
});
