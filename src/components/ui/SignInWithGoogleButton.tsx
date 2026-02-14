import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { PressableScale } from "pressto";
import { Activity } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Text } from "./Text";

export default function SignInWithGoogleButton({
  onPress,
  disabled = false,
  isLoading = false,
}: {
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const { isDark } = useTheme();
  const textColor = isDark ? "#fff" : "#000";

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
          backgroundColor: isDark ? Color.grayscale[100] : Color.grayscale[900],
        }}
      >
        <Activity mode={isLoading ? "visible" : "hidden"}>
          <ActivityIndicator style={{ height: 44 }} color={textColor} />
        </Activity>

        <Activity mode={!isLoading ? "visible" : "hidden"}>
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={{
              width: 18,
              height: 18,
              marginRight: 6,
            }}
          />
          <Text type="default" weight="semibold" style={{ color: textColor }}>
            Continue with Google
          </Text>
        </Activity>
      </View>
    </PressableScale>
  );
}
