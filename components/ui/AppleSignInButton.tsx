import { authClient } from "@/lib/auth-client";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, useColorScheme } from "react-native";

export function AppleSignInButton() {
  const colorScheme = useColorScheme();
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={
        colorScheme === "dark"
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      }
      cornerRadius={100}
      style={styles.button}
      onPress={async () => {
        await Haptics.selectionAsync();
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          if (!credential.identityToken) {
            Alert.alert(
              "Something went wrong",
              "Please try again or sign in with Google"
            );
            return;
          }
          await authClient.signIn.social({
            provider: "apple",
            idToken: {
              token: credential.identityToken,
            },
          });
        } catch (e: any) {
          if (e.code === "ERR_REQUEST_CANCELED") {
            return;
          } else {
            Alert.alert(
              "Something went wrong",
              "Please try again or sign in with Google"
            );
          }
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 44,
  },
});
