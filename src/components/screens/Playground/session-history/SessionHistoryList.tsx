import { deleteCachedImage } from "@/lib/image-cache";
import * as Haptics from "expo-haptics";
import { FlatList, View } from "react-native";
import { SessionHistoryItem } from "./SessionHistoryItem";

export interface SessionHistoryListProps {
  sessionGenerations: string[][];
  activeGenerationIndex: number | undefined;
  setActiveGenerationIndex: (
    index:
      | number
      | undefined
      | ((prev: number | undefined) => number | undefined)
  ) => void;
  setSessionGenerations: (
    generations: string[][] | ((prev: string[][]) => string[][])
  ) => void;
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
            secondUri={imageGroup[1]} // Show second image if exists
            imageCount={imageGroup.length}
            onSave={() => handleSave(imageGroup[0])}
            onShare={() => handleShare(imageGroup[0])}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setActiveGenerationIndex(() => index);
            }}
            onDelete={async () => {
              // Delete all cached images in this group from the file system
              for (const uri of imageGroup) {
                await deleteCachedImage(uri);
              }

              // Remove the group from the session array using functional update
              // to ensure we're working with the latest state
              // Use imageGroup reference to find the correct item to delete
              setSessionGenerations((prev) =>
                prev.filter((group) => group !== imageGroup)
              );

              // Update active index if needed
              setActiveGenerationIndex((prevActiveIndex) => {
                if (prevActiveIndex === undefined) return undefined;

                // Find the current index of the item we're deleting
                const deletedIndex = sessionGenerations.indexOf(imageGroup);

                if (prevActiveIndex === deletedIndex) {
                  return undefined;
                } else if (prevActiveIndex > deletedIndex) {
                  return prevActiveIndex - 1;
                }

                return prevActiveIndex;
              });
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
        }}
        // // Performance optimizations
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
        horizontal
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
