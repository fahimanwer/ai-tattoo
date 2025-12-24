import { featuredTattoos } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  PlaygroundSuggestionProps,
  Suggestion,
} from "./PlaygroundSuggestions.types";

// Generate suggestions from featured tattoos
function generateSuggestions(): Suggestion[] {
  const suggestions: Suggestion[] = [];

  for (const tattoo of featuredTattoos) {
    // Add a simple text suggestion for the style
    suggestions.push({
      type: "text",
      label: `Create a ${tattoo.title} tattoo`,
      prompt: `Create a ${tattoo.title} style tattoo`,
    });

    // Add a "Try on" suggestion with a random gallery image
    if (tattoo.gallery.length > 0) {
      const randomImage =
        tattoo.gallery[Math.floor(Math.random() * tattoo.gallery.length)];
      if (randomImage.uri) {
        suggestions.push({
          type: "tryOn",
          label: `Try ${tattoo.title} style`,
          styleName: tattoo.title,
          imageUri: randomImage.uri,
          thumbnailUri: randomImage.uri,
        });
      }
    }
  }

  // Shuffle suggestions for variety
  return suggestions.sort(() => Math.random() - 0.5);
}

const CONTAINER_HEIGHT = 80;

export function PlaygroundSuggestions({
  onSelectText,
  onSelectTryOn,
  style,
  visible = true,
}: PlaygroundSuggestionProps) {
  // Generate suggestions once and memoize
  const suggestions = React.useMemo(() => generateSuggestions(), []);

  // Animate height to 0 when hidden - this removes it from layout
  // and prevents touch interception
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(visible ? 1 : 0, { duration: 200 }),
      height: withTiming(visible ? CONTAINER_HEIGHT : 0, { duration: 200 }),
      overflow: "hidden",
    };
  }, [visible]);

  const renderItem = React.useCallback(
    ({ item }: { item: Suggestion }) => (
      <SuggestionChip
        suggestion={item}
        onSelectText={onSelectText}
        onSelectTryOn={onSelectTryOn}
      />
    ),
    [onSelectText, onSelectTryOn]
  );

  const keyExtractor = React.useCallback(
    (item: Suggestion, index: number) => `${item.label}-${index}`,
    []
  );

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      <LegendList
        horizontal
        numColumns={2}
        data={suggestions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        recycleItems
      />
    </Animated.View>
  );
}

function SuggestionChip({
  suggestion,
  onSelectText,
  onSelectTryOn,
}: {
  suggestion: Suggestion;
  onSelectText: (prompt: string) => void;
  onSelectTryOn: (styleName: string, imageUri: string) => void;
}) {
  const handlePress = () => {
    if (suggestion.type === "text") {
      onSelectText(suggestion.prompt);
    } else {
      onSelectTryOn(suggestion.styleName, suggestion.imageUri);
    }
  };

  if (suggestion.type === "tryOn") {
    return (
      <PressableScale style={styles.tryOnChip} onPress={handlePress}>
        <Image
          source={{ uri: suggestion.thumbnailUri }}
          style={styles.thumbnail}
          contentFit="cover"
        />
        <Text type="sm" style={styles.tryOnText}>
          {suggestion.label}
        </Text>
      </PressableScale>
    );
  }

  return (
    <PressableScale style={styles.textChip} onPress={handlePress}>
      <Text type="sm" style={styles.textChipLabel}>
        {suggestion.label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  textChip: {
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 32,
    borderWidth: 1,
    borderColor: "#FFFFFF20",
    borderRadius: 100,
  },
  textChipLabel: {
    textAlign: "center",
    color: "#FFFFFF90",
  },
  tryOnChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 12,
    height: 32,
    borderWidth: 1,
    borderColor: "#FFFFFF20",
    borderRadius: 100,
    gap: 8,
  },
  thumbnail: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  tryOnText: {
    color: "#FFFFFF90",
  },
});
