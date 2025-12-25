import { featuredTattoos } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { LegendList } from "@legendapp/list";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import React, { use, useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
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

const ROW_HEIGHT = 32;
const ROW_GAP = 10;
const CONTAINER_HEIGHT = ROW_HEIGHT * 2 + ROW_GAP;

export function PlaygroundSuggestions({
  onSelectText,
  onSelectTryOn,
  style,
  visible = true,
}: PlaygroundSuggestionProps) {
  const list1Ref = useRef<any>(null);
  const list2Ref = useRef<any>(null);
  const isScrollingRef = useRef<1 | 2 | null>(null);
  const { activeMutation } = use(PlaygroundContext);

  // Hide suggestions if the active mutation is pending or visible is false
  const shouldShowSuggestions = React.useMemo(() => {
    return !activeMutation.isPending && visible;
  }, [activeMutation.isPending, visible]);

  // Generate suggestions once and memoize, split into two rows
  const { row1, row2 } = React.useMemo(() => {
    const all = generateSuggestions();
    const mid = Math.ceil(all.length / 2);
    return {
      row1: all.slice(0, mid),
      row2: all.slice(mid),
    };
  }, []);

  // Animate height to 0 when hidden - this removes it from layout
  // and prevents touch interception
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(shouldShowSuggestions ? 1 : 0, { duration: 200 }),
      height: withTiming(shouldShowSuggestions ? CONTAINER_HEIGHT : 0, {
        duration: 200,
      }),
      overflow: "hidden",
    };
  }, [shouldShowSuggestions]);

  const handleScroll1 = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollingRef.current === 2) return;
    isScrollingRef.current = 1;
    const x = e.nativeEvent.contentOffset.x;
    list2Ref.current?.scrollTo?.({ x, animated: false });
  };

  const handleScroll2 = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollingRef.current === 1) return;
    isScrollingRef.current = 2;
    const x = e.nativeEvent.contentOffset.x;
    list1Ref.current?.scrollTo?.({ x, animated: false });
  };

  const handleScrollEnd = () => {
    isScrollingRef.current = null;
  };

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
        ref={list1Ref}
        horizontal
        data={row1}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.row}
        onScroll={handleScroll1}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        recycleItems
      />
      <LegendList
        ref={list2Ref}
        horizontal
        data={row2}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.row}
        onScroll={handleScroll2}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
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
      <PressableScale onPress={handlePress}>
        <GlassView style={styles.tryOnChip}>
          <Image
            source={{ uri: suggestion.thumbnailUri }}
            style={styles.thumbnail}
            contentFit="cover"
          />
          <Text type="sm" style={styles.tryOnText}>
            {suggestion.label}
          </Text>
        </GlassView>
      </PressableScale>
    );
  }

  return (
    <PressableScale onPress={handlePress}>
      <GlassView style={styles.textChip}>
        <Text type="sm" style={styles.textChipLabel}>
          {suggestion.label}
        </Text>
      </GlassView>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: ROW_GAP,
  },
  row: {
    height: ROW_HEIGHT,
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
