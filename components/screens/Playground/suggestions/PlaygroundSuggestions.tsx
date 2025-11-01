import { Text } from "@/components/ui/Text";
import { blurhash } from "@/components/ui/VerticalCard";
import { Color } from "@/constants/TWPalette";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { View } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { PlaygroundSuggestionProps } from "./PlaygroundSuggestions.types";

export function PlaygroundSuggestions({
  onSelect,
  style,
}: PlaygroundSuggestionProps) {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInDown.duration(1000)}
      exiting={FadeOut}
      style={[
        {
          paddingHorizontal: 16,
          gap: 16,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text weight="bold">Suggestions</Text>

        <PressableScale onPress={() => router.back()}>
          <Text style={{ color: Color.yellow[500] }}>Show More</Text>
        </PressableScale>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        {featuredTattoos.map((item) => (
          <PressableScale
            key={item.title}
            style={{ alignItems: "center", gap: 8 }}
            onPress={() => onSelect(item.title)}
          >
            <Image
              source={item.image}
              style={{ width: 60, height: 60, borderRadius: 30 }}
              placeholder={{ blurhash: blurhash }}
              transition={300}
            />
            <Text type="sm">{item.title}</Text>
          </PressableScale>
        ))}
      </View>
      <Text type="xs" style={{ color: "gray", textAlign: "center" }}>
        Note: AI Tattoo Generator may create unexpected results.
      </Text>
    </Animated.View>
  );
}
