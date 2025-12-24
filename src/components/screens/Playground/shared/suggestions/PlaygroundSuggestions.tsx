import { Text } from "@/src/components/ui/Text";
import { PressableScale } from "pressto";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PlaygroundSuggestionProps } from "./PlaygroundSuggestions.types";

const suggestions = [
  { label: "Create a dragon on arm", prompt: "A dragon tattoo on arm" },
  { label: "Design a rose on chest", prompt: "A rose tattoo on chest" },
  { label: "Make a skull on back", prompt: "A skull tattoo on back" },
  { label: "Add a compass on forearm", prompt: "A compass tattoo on forearm" },
  { label: "Draw a feather on wrist", prompt: "A feather tattoo on wrist" },
  { label: "Get a lion on shoulder", prompt: "A lion tattoo on shoulder" },
  { label: "Create a wave on leg", prompt: "A wave tattoo on leg" },
  { label: "Show a butterfly on ankle", prompt: "A butterfly tattoo on ankle" },
  { label: "Design a tree on spine", prompt: "A tree tattoo on spine" },
  { label: "Make a moon on thigh", prompt: "A moon tattoo on thigh" },
];

export function PlaygroundSuggestions({
  onSelect,
  style,
}: PlaygroundSuggestionProps) {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {suggestions.map((item) => (
          <PressableScale
            key={item.prompt}
            style={styles.suggestionItem}
            onPress={() => onSelect(item.prompt)}
          >
            <Text type="sm" style={styles.suggestionText}>
              {item.label}
            </Text>
          </PressableScale>
        ))}
      </ScrollView>
    </View>
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
  suggestionItem: {
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 32,
    borderWidth: 1,
    borderColor: "#FFFFFF20",
    borderRadius: 100,
  },
  suggestionText: {
    textAlign: "center",
    color: "#FFFFFF90",
  },
});
