import { PressableScale } from "pressto";
import { Image, View } from "react-native";
import { Text } from "./Text";

export default function SignInWithGoogleButton({
  onPress,
  disabled = false,
}: {
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <PressableScale
      onPress={() => {
        if (disabled) return;
        onPress();
      }}
    >
      <View
        style={{
          width: "100%",
          height: 44,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          backgroundColor: "#000",
          borderWidth: 1,
          borderColor: "gray",
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
        <Text type="default" weight="semibold" style={{ color: "#fff" }}>
          Continue with Google
        </Text>
      </View>
    </PressableScale>
  );
}
