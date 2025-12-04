import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import {
  getAllBodyParts,
  getBodyPartDisplayName,
} from "@/src/utils/bodyPartsUtils";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export interface BodyPartFilterItem {
  id: string;
  name: string;
  displayName: string;
  iconUri: string;
}

interface BodyPartFilterProps {
  selectedBodyPart: string | null;
  onSelectBodyPart: (bodyPart: string | null) => void;
}

// Mapeo entre nombres de body parts y nombres de archivos PNG
const bodyPartToIconMap: Record<string, string> = {
  all: "all",
  arm: "arms",
  back: "back",
  chest: "chest",
  feet: "feet",
  hand: "hands",
  thigh: "legs",
  neck: "neck",
  rib: "ribs",
  shin: "shin",
  shoulder: "shoulder",
  wrist: "wrist",
};

// Base URL para los iconos de filtros (ajusta según donde estén tus assets)
const FILTER_ICONS_BASE_URL =
  "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/icons-filters-body-part/";

function getIconUri(bodyPart: string): string {
  const iconName = bodyPartToIconMap[bodyPart] || bodyPart;
  return `${FILTER_ICONS_BASE_URL}${iconName}.png`;
}

interface FilterItemProps {
  item: BodyPartFilterItem;
  isSelected: boolean;
  onPress: (item: BodyPartFilterItem) => void;
}

const FilterItem = memo(({ item, isSelected, onPress }: FilterItemProps) => {
  return (
    <Pressable onPress={() => onPress(item)} style={styles.filterItem}>
      <Image
        source={{ uri: item.iconUri }}
        style={[styles.icon, { opacity: isSelected ? 1 : 0.3 }]}
        contentFit="contain"
      />
      <Text
        type="xs"
        style={styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.displayName}
      </Text>
    </Pressable>
  );
});

FilterItem.displayName = "FilterItem";

export function BodyPartFilter({
  selectedBodyPart,
  onSelectBodyPart,
}: BodyPartFilterProps) {
  const allBodyParts = useMemo(() => getAllBodyParts(), []);

  const filterItems = useMemo<BodyPartFilterItem[]>(() => {
    const items: BodyPartFilterItem[] = [
      {
        id: "all",
        name: "all",
        displayName: "All",
        iconUri: getIconUri("all"),
      },
    ];

    allBodyParts.forEach((bodyPart) => {
      items.push({
        id: bodyPart,
        name: bodyPart,
        displayName: getBodyPartDisplayName(bodyPart),
        iconUri: getIconUri(bodyPart),
      });
    });

    return items;
  }, [allBodyParts]);

  const handleFilterPress = (item: BodyPartFilterItem) => {
    if (item.id === "all") {
      onSelectBodyPart(null);
    } else {
      onSelectBodyPart(item.id);
    }
  };

  return (
    <View style={styles.container}>
      <LegendList
        horizontal
        data={filterItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected =
            selectedBodyPart === null
              ? item.id === "all"
              : selectedBodyPart === item.id;

          return (
            <FilterItem
              item={item}
              isSelected={isSelected}
              onPress={handleFilterPress}
            />
          );
        }}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        extraData={selectedBodyPart}
        recycleItems={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
    gap: 4,
  },
  filterItem: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,
    backgroundColor: "transparent",
    width: 80,
    height: 80,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 4,
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    color: Color.grayscale[600],
  },
});
