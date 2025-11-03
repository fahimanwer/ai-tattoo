import { Text } from "@/components/ui/Text";
import { blurhash } from "@/components/ui/VerticalCard";
import { Color } from "@/constants/TWPalette";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import { ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PlaygroundSuggestionProps } from "./PlaygroundSuggestions.types";

export function PlaygroundSuggestions({
  onSelect,
  style,
}: PlaygroundSuggestionProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(1000)}
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
      <ScrollView horizontal snapToAlignment="center">
        {featuredTattoos.map((item) => (
          <PressableScale
            key={item.title}
            style={{ alignItems: "center", marginRight: 16 }}
            onPress={() => onSelect(item.title)}
          >
            <Image
              source={item.image}
              style={{ width: 40, height: 40, borderRadius: 99 }}
              placeholder={{ blurhash: blurhash }}
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
