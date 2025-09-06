import { Text } from "@/components/ui/Text";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";
export function Banner() {
  return (
    <Pressable
      onPress={() => {}}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      unstable_pressDelay={0}
      style={({ pressed }) => [
        {
          position: "relative",
          height: 198,
          borderRadius: 16,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{ height: "100%", width: "100%", borderRadius: 16 }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: 32,
          zIndex: 2,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text type="3xl" weight="bold">
          Unlock Premium Tattoos
        </Text>
        <Text
          type="base"
          weight="light"
          style={{ textAlign: "center", opacity: 0.7 }}
        >
          Unlimited designs, exclusive styles & HD downloads
        </Text>
      </View>
      <Image
        source={require("@/assets/images/banner-pro.png")}
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
        contentFit="cover"
      />
    </Pressable>
  );
}
