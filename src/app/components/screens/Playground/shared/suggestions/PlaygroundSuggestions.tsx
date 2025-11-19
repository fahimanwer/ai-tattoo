import { featuredTattoos } from "@/lib/featured-tattoos";
import { BLURHASH } from "@/lib/image-cache";
import { Text } from "@/src/app/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import { ScrollView } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { PlaygroundSuggestionProps } from "./PlaygroundSuggestions.types";

export function PlaygroundSuggestions({
  onSelect,
  style,
}: PlaygroundSuggestionProps) {
  const suggestions = [...featuredTattoos].reverse();
  return (
    <Animated.View
      entering={FadeInDown.duration(1000)}
      exiting={FadeOut.duration(1000)}
      style={[
        {
          paddingHorizontal: 16,
          gap: 8,
        },
        style,
      ]}
    >
      <Text type="sm" weight="bold">
        Suggestions
      </Text>
      <ScrollView
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
        {suggestions.map((item) => (
          <PressableScale
            key={item.title}
            style={{ alignItems: "center", marginRight: 16 }}
            onPress={() => onSelect(item.title)}
          >
            <Image
              source={item.image}
              style={{ width: 40, height: 40, borderRadius: 99 }}
              placeholder={{ blurhash: item.image?.blurhash || BLURHASH }}
              transition={300}
            />
            <Text
              type="sm"
              style={{
                textAlign: "center",
                color: Color.gray[100],
                marginTop: 4,
              }}
            >
              {item.title}
            </Text>
          </PressableScale>
        ))}
      </ScrollView>
      <Text type="xs" style={{ color: "gray", textAlign: "center" }}>
        Note: AI Tattoo may create unexpected results.
      </Text>
    </Animated.View>
  );
}
