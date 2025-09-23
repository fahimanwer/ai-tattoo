import { Color } from "@/constants/TWPalette";
import { Image, Pressable, View } from "react-native";
import { Text } from "./Text";

export default function SignInWithGoogleButton({
  onPress,
  disabled = false,
}: {
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        style={{
          width: "100%",
          height: 44,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      >
        <Image
          source={require("../../assets/images/google-icon.png")}
          style={{
            width: 18,
            height: 18,
            marginRight: 6,
          }}
        />
        <Text
          type="default"
          weight="semibold"
          style={{ color: Color.grayscale[50] }}
        >
          Continue with Google
        </Text>
      </View>
    </Pressable>
  );
}
