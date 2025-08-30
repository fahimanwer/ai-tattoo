import LinearGradientImageBlur from "@/components/LinearGradientImageBlur";
import { AppleSignInButton } from "@/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/components/ui/SignInWithGoogleButton";
import { Text } from "@/components/ui/Text";

import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";

import { StyleSheet, View } from "react-native";

export default function Home() {
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

          <View style={{ gap: 16, marginTop: 32, width: "100%" }}>
            <SignInWithGoogleButton
              onPress={() => {
                authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/(tabs)/home",
                });
              }}
            />
            <AppleSignInButton />
            {/* <Button
              title="Get started"
              color="neutral"
              variant="solid"
              radius="full"
              size="lg"
              onPress={() => {
                setIsAuthenticated(true);
              }}
            /> */}
          </View>

          <View style={styles.termsContainer}>
            <Text type="sm" style={styles.termsText}>
              By continuing you agree to our{" "}
              <Link href="/terms-of-service" asChild>
                <Text type="sm" style={styles.linkText}>
                  Terms of Service
                </Text>
              </Link>
            </Text>
          </View>
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

  termsContainer: {
    marginTop: 24,
    alignItems: "center",
    width: "100%",
  },

  termsText: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
  },

  termsLink: {
    // Empty style for inline TouchableOpacity
  },

  linkText: {
    textDecorationLine: "underline",
    opacity: 0.9,
  },
});
