import * as Haptics from "expo-haptics";
import { FlatList, View } from "react-native";
import { SessionHistoryItem } from "./SessionHistoryItem";
import { SessionHistoryListFooter } from "./SessionHistoryListFooter";

export interface SessionHistoryListProps {
  sessionGenerations: string[][];
  activeGenerationIndex: number | undefined;
  setActiveGenerationIndex: (
    index: number | undefined | ((prev: number | undefined) => number)
  ) => void;
  setSessionGenerations: (generations: string[][]) => void;
  handleSave: (uri: string) => Promise<void>;
  handleShare: (uri: string) => Promise<void>;
}

export function SessionHistoryList({
  sessionGenerations,
  activeGenerationIndex,
  setActiveGenerationIndex,
  setSessionGenerations,
  handleSave,
  handleShare,
}: SessionHistoryListProps) {
  if (sessionGenerations.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: -10,
        zIndex: 1,
      }}
    >
      <FlatList
        data={sessionGenerations}
        renderItem={({ item: imageGroup, index }) => (
          <SessionHistoryItem
            uri={imageGroup[0]} // Show first image of the group
            imageCount={imageGroup.length}
            onSave={() => handleSave(imageGroup[0])}
            onShare={() => handleShare(imageGroup[0])}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setActiveGenerationIndex(() => index);
            }}
            onDelete={() => {
              const newGenerations = sessionGenerations.filter(
                (_, i) => i !== index
              );
              setSessionGenerations(newGenerations);
              // Update active index if needed
              if (activeGenerationIndex === index) {
                setActiveGenerationIndex(undefined);
              } else if (
                activeGenerationIndex !== undefined &&
                activeGenerationIndex > index
              ) {
                setActiveGenerationIndex(activeGenerationIndex - 1);
              }
            }}
            onSelect={() => setActiveGenerationIndex(index)}
            isActive={activeGenerationIndex === index}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `generation-${index}-${item[0] || ""}`}
        contentContainerStyle={{
          paddingHorizontal: 4,
          gap: 8,
        }}
        // Performance optimizations
        getItemLayout={(_, index) => ({
          length: 50,
          offset: 50 * index + 16 * index, // item width + gap
          index,
        })}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        ListFooterComponentStyle={{
          justifyContent: "center",
        }}
        ListFooterComponent={() => (
          <SessionHistoryListFooter
            isVisible={activeGenerationIndex !== undefined}
            onPress={() => setActiveGenerationIndex(undefined)}
          />
        )}
        horizontal
      />
    </View>
  );
}
