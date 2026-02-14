import { deleteCachedImage } from "@/lib/image-cache";
import { LegendList } from "@legendapp/list";
import * as Haptics from "expo-haptics";
import { View } from "react-native";
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
      <LegendList
        data={sessionGenerations}
        renderItem={({ item: imageGroup, index }) => (
          <SessionHistoryItem
            uri={imageGroup[0]}
            secondUri={imageGroup[1]}
            imageCount={imageGroup.length}
            onSave={() => handleSave(imageGroup[0])}
            onShare={() => handleShare(imageGroup[0])}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setActiveGenerationIndex(() => index);
            }}
            onDelete={async () => {
              for (const uri of imageGroup) {
                await deleteCachedImage(uri);
              }
              setSessionGenerations((prev) =>
                prev.filter((group) => group !== imageGroup)
              );
              setActiveGenerationIndex((prevActiveIndex) => {
                if (prevActiveIndex === undefined) return undefined;
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
        estimatedItemSize={50}
        horizontal
        recycleItems
      />
    </View>
  );
}
