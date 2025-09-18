import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { Pressable } from "react-native";
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
      {/*   <GlassView
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
        <GlassView
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
          }}
          glassEffectStyle="clear"
        />
      </GlassView> */}
      <GlassView
        style={{
          position: "absolute",
          width: "98%",
          left: "50%",
          transform: [{ translateX: "-50%" }],
          bottom: 4,
          zIndex: 2,
          flex: 1,
          borderRadius: 16,
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
        }}
        glassEffectStyle="clear"
      >
        <Text type="2xl" weight="bold">
          Unlock Premium Tattoos
        </Text>
        <Text
          type="base"
          weight="light"
          style={{ textAlign: "center", opacity: 0.7 }}
        >
          Unlimited designs, exclusive styles & HD downloads
        </Text>
      </GlassView>
      <Image
        cachePolicy="memory-disk"
        source={require("@/assets/images/banner-pro.png")}
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
        contentFit="cover"
      />
    </Pressable>
  );
}
