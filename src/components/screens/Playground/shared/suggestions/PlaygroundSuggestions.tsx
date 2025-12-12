import { Text } from "@/src/components/ui/Text";
import { Button, Host } from "@expo/ui/swift-ui";
import { frame } from "@expo/ui/swift-ui/modifiers";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { PlaygroundSuggestionProps } from "./PlaygroundSuggestions.types";

const suggestionsRow1 = [
  {
    label: "Create a dragon on arm",
    icon: "🐉",
    prompt: "A dragon tattoo on arm",
  },
  {
    label: "Design a rose on chest",
    icon: "🌹",
    prompt: "A rose tattoo on chest",
  },
  {
    label: "Make a skull on back",
    icon: "💀",
    prompt: "A skull tattoo on back",
  },
  {
    label: "Add a compass on forearm",
    icon: "🧭",
    prompt: "A compass tattoo on forearm",
  },
  {
    label: "Draw a feather on wrist",
    icon: "🪶",
    prompt: "A feather tattoo on wrist",
  },
];

const suggestionsRow2 = [
  {
    label: "Get a lion on shoulder",
    icon: "🦁",
    prompt: "A lion tattoo on shoulder",
  },
  {
    label: "Create a wave on leg",
    icon: "🌊",
    prompt: "A wave tattoo on leg",
  },
  {
    label: "Show a butterfly on ankle",
    icon: "🦋",
    prompt: "A butterfly tattoo on ankle",
  },
  {
    label: "Design a tree on spine",
    icon: "🌳",
    prompt: "A tree tattoo on spine",
  },
  {
    label: "Make a moon on thigh",
    icon: "🌙",
    prompt: "A moon tattoo on thigh",
  },
];

const suggestionsRow3 = [
  {
    label: "Add a wolf on side",
    icon: "🐺",
    prompt: "A wolf tattoo on side",
  },
  {
    label: "Create a star on hand",
    icon: "⭐",
    prompt: "A star tattoo on hand",
  },
  {
    label: "Design an anchor on bicep",
    icon: "⚓",
    prompt: "An anchor tattoo on bicep",
  },
  {
    label: "Draw a heart on collarbone",
    icon: "❤️",
    prompt: "A heart tattoo on collarbone",
  },
  {
    label: "Get a bird on rib",
    icon: "🐦",
    prompt: "A bird tattoo on rib",
  },
];

const SuggestionItem = React.memo(
  ({
    item,
    onSelect,
  }: {
    item: (typeof suggestionsRow1)[0];
    onSelect: (prompt: string) => void;
  }) => {
    return (
      <Host style={{ marginRight: 44 }} matchContents>
        <Button
          onPress={() => onSelect(item.prompt)}
          variant="glass"
          modifiers={[frame({ width: 190, height: 44 })]}
        >
          <Text type="sm" style={{ textAlign: "center" }}>
            {item.label}
          </Text>
        </Button>
      </Host>
    );
  }
);

SuggestionItem.displayName = "SuggestionItem";

const MarqueeRow = ({
  suggestions,
  reverse,
  onSelect,
}: {
  suggestions: typeof suggestionsRow1;
  reverse: boolean;
  onSelect: (prompt: string) => void;
}) => {
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const contentWidth = React.useRef(0);
  const containerWidth = React.useRef(0);
  const animationRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const [isReady, setIsReady] = React.useState(false);

  const startAnimation = React.useCallback(() => {
    if (
      contentWidth.current > containerWidth.current &&
      scrollViewRef.current &&
      isReady
    ) {
      const maxScroll = contentWidth.current - containerWidth.current;
      let currentScroll = reverse ? maxScroll : 0;
      const step = 0.5;
      const direction = reverse ? -1 : 1;

      const animate = () => {
        if (!scrollViewRef.current) return;

        currentScroll += step * direction;

        if (currentScroll >= maxScroll) {
          currentScroll = 0;
        } else if (currentScroll <= 0) {
          currentScroll = maxScroll;
        }

        (scrollViewRef.current as any)?.scrollTo({
          x: currentScroll,
          y: 0,
          animated: false,
        });
        animationRef.current = setTimeout(animate, 16);
      };

      animate();
    }
  }, [reverse, isReady]);

  React.useEffect(() => {
    if (isReady) {
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isReady, startAnimation]);

  return (
    <View style={styles.rowContainer}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={false}
        onContentSizeChange={(width) => {
          if (width > 0) {
            contentWidth.current = width;
            if (containerWidth.current > 0) {
              setIsReady(true);
            }
          }
        }}
        onLayout={(ev) => {
          const width = ev.nativeEvent.layout.width;
          if (width > 0) {
            containerWidth.current = width;
            if (contentWidth.current > 0) {
              setIsReady(true);
            }
          }
        }}
      >
        <View style={styles.contentRow}>
          {suggestions.map((item, index) => (
            <SuggestionItem
              key={`${index}-${item.label}`}
              item={item}
              onSelect={onSelect}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 44,
    marginBottom: 0,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export function PlaygroundSuggestions({
  onSelect,
  style,
}: PlaygroundSuggestionProps) {
  const combinedRow1 = React.useMemo(
    () => [...suggestionsRow1, ...suggestionsRow2, ...suggestionsRow3],
    []
  );
  const combinedRow2 = React.useMemo(
    () => [...suggestionsRow2, ...suggestionsRow1, ...suggestionsRow3],
    []
  );
  const combinedRow3 = React.useMemo(
    () => [...suggestionsRow3, ...suggestionsRow2, ...suggestionsRow1],
    []
  );

  return (
    <View
      style={[
        {
          width: "100%",
        },
        style,
      ]}
    >
      <MarqueeRow
        suggestions={combinedRow1}
        reverse={false}
        onSelect={onSelect}
      />
      <MarqueeRow
        suggestions={combinedRow2}
        reverse={true}
        onSelect={onSelect}
      />
      <MarqueeRow
        suggestions={combinedRow3}
        reverse={false}
        onSelect={onSelect}
      />
    </View>
  );
}
