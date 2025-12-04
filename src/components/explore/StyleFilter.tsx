import { featuredTattoos } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

export interface StyleFilterItem {
  id: number;
  name: string;
  displayName: string;
  imageUri: string | undefined;
}

interface StyleFilterProps {
  selectedStyle: number | null;
  onSelectStyle: (styleId: number | null) => void;
}

interface FilterItemProps {
  item: StyleFilterItem;
  isSelected: boolean;
  onPress: (item: StyleFilterItem) => void;
}

const FilterItem = memo(({ item, isSelected, onPress }: FilterItemProps) => {
  return (
    <PressableScale onPress={() => onPress(item)} style={styles.filterItem}>
      {item.imageUri ? (
        <Image
          source={{ uri: item.imageUri }}
          style={[styles.icon, { opacity: isSelected ? 1 : 0.5 }]}
          contentFit="cover"
        />
      ) : (
        <View
          style={[styles.iconPlaceholder, { opacity: isSelected ? 1 : 0.3 }]}
        />
      )}
      <Text
        type="xs"
        style={styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.displayName}
      </Text>
    </PressableScale>
  );
});

FilterItem.displayName = "FilterItem";

export function StyleFilter({
  selectedStyle,
  onSelectStyle,
}: StyleFilterProps) {
  const filterItems = useMemo<StyleFilterItem[]>(() => {
    const items: StyleFilterItem[] = [
      {
        id: 0,
        name: "all",
        displayName: "All",
        imageUri: undefined,
      },
    ];

    featuredTattoos.forEach((tattoo) => {
      items.push({
        id: tattoo.id,
        name: tattoo.title,
        displayName: tattoo.title,
        imageUri: tattoo.image?.uri,
      });
    });

    return items;
  }, []);

  const handleFilterPress = (item: StyleFilterItem) => {
    if (item.id === 0) {
      onSelectStyle(null);
    } else {
      onSelectStyle(item.id);
    }
  };

  return (
    <View style={styles.container}>
      <LegendList
        horizontal
        data={filterItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected =
            selectedStyle === null ? item.id === 0 : selectedStyle === item.id;

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
        extraData={selectedStyle}
        recycleItems={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    height: 90,
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
    height: 88,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginBottom: 4,
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: Color.grayscale[300],
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    color: Color.grayscale[600],
  },
});
