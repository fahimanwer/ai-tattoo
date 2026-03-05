/**
 * AppTattooGallery -- BottomSheet gallery of built-in tattoo designs.
 *
 * Displays sketch designs from `lib/sketch-design.ts` in a filterable grid.
 * Used by the Try On flow as an alternative to picking from the device gallery.
 *
 * NOTE: Uses RN's Text (not our custom Text) because BottomSheet.Portal renders
 * outside the ThemeProvider tree, so useTheme/useThemeColor are unavailable.
 * Theme info is passed via the `isDark` prop from the parent.
 */

import { BLURHASH } from "@/lib/image-cache";
import { api } from "@/lib/nano";
import { sketchDesigns } from "@/lib/sketch-design";
import { Color } from "@/src/constants/TWPalette";
import { BottomSheet } from "heroui-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PressableScale } from "pressto";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLUMN_COUNT = 3;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_GAP = 8;
const HORIZONTAL_PADDING = 20;
const ITEM_SIZE =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - ITEM_GAP * (COLUMN_COUNT - 1)) /
  COLUMN_COUNT;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AppTattooGalleryProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDesign: (uri: string) => void;
  isDark: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const COMMUNITY_FILTER = -1;

export function AppTattooGallery({
  isOpen,
  onOpenChange,
  onSelectDesign,
  isDark,
}: AppTattooGalleryProps) {
  const { t } = useTranslation();
  const [selectedStyleId, setSelectedStyleId] = useState<number | null>(null);
  const communityTattoos = useQuery(api.extractedTattoos.list);

  const isCommunitySelected = selectedStyleId === COMMUNITY_FILTER;

  const filteredImages =
    selectedStyleId === null
      ? sketchDesigns.flatMap((s) => s.gallery)
      : selectedStyleId === COMMUNITY_FILTER
        ? []
        : sketchDesigns
            .filter((s) => s.id === selectedStyleId)
            .flatMap((s) => s.gallery);

  function handleSelect(uri: string, transparentUri?: string) {
    // Prefer the transparent PNG for try-on overlay if available
    onSelectDesign(transparentUri || uri);
    onOpenChange(false);
  }

  const chipBg = isDark ? Color.zinc[800] : Color.zinc[200];
  const chipActiveBg = isDark ? "#8B5CF6" : "#7C3AED";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content snapPoints={["80%"]}>
          <View style={styles.header}>
            <BottomSheet.Title>
              {t("flows.tryOn.browseDesigns")}
            </BottomSheet.Title>
          </View>

          {/* Style filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            <PressableScale
              onPress={() => setSelectedStyleId(null)}
              style={[
                styles.chip,
                { backgroundColor: selectedStyleId === null ? chipActiveBg : chipBg },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: selectedStyleId === null ? "#fff" : textColor },
                ]}
              >
                {t("common.all")}
              </Text>
            </PressableScale>

            {communityTattoos && communityTattoos.length > 0 && (
              <PressableScale
                onPress={() => setSelectedStyleId(COMMUNITY_FILTER)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      isCommunitySelected ? chipActiveBg : chipBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isCommunitySelected ? "#fff" : textColor },
                  ]}
                >
                  {t("flows.tryOn.community")}
                </Text>
              </PressableScale>
            )}

            {sketchDesigns.map((s) => (
              <PressableScale
                key={s.id}
                onPress={() => setSelectedStyleId(s.id)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      selectedStyleId === s.id ? chipActiveBg : chipBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: selectedStyleId === s.id ? "#fff" : textColor },
                  ]}
                >
                  {s.title}
                </Text>
              </PressableScale>
            ))}
          </ScrollView>

          {/* Image grid */}
          <BottomSheetScrollView contentContainerStyle={styles.grid}>
            <View style={styles.gridInner}>
              {isCommunitySelected
                ? communityTattoos
                    ?.filter((t) => t.url)
                    .map((t) => (
                      <PressableScale
                        key={t._id}
                        onPress={() => handleSelect(t.url!)}
                        style={[
                          styles.gridItem,
                          {
                            borderColor: isDark
                              ? Color.zinc[700]
                              : Color.zinc[200],
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: t.url! }}
                          style={styles.gridImage}
                          contentFit="cover"
                          cachePolicy="memory-disk"
                          placeholder={{ blurhash: BLURHASH }}
                          transition={300}
                        />
                      </PressableScale>
                    ))
                : filteredImages.map((img, idx) => (
                    <PressableScale
                      key={`${selectedStyleId}-${idx}`}
                      onPress={() => handleSelect(img.uri, img.transparentUri)}
                      style={[
                        styles.gridItem,
                        {
                          borderColor: isDark
                            ? Color.zinc[700]
                            : Color.zinc[200],
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: img.uri }}
                        style={styles.gridImage}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        placeholder={{ blurhash: img.blurhash || BLURHASH }}
                        transition={300}
                      />
                    </PressableScale>
                  ))}
            </View>
          </BottomSheetScrollView>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 8,
  },
  chipRow: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  grid: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 40,
  },
  gridInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ITEM_GAP,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});
