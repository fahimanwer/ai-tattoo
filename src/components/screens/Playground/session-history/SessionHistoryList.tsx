import * as Haptics from "expo-haptics";
import { FlatList, View } from "react-native";
import { SessionHistoryItem } from "./SessionHistoryItem";

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
    <View>
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
          paddingHorizontal: 16,
          gap: 8,
          marginTop: -3,
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
        // ListFooterComponent={() => (
        //   <SessionHistoryListFooter
        //     onPress={() => setActiveGenerationIndex(undefined)}
        //   />
        // )}
        horizontal
      />
    </View>
  );
}
