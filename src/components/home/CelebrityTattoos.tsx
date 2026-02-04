import { tattooCategories } from "@/lib/celebrity-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

export function CelebrityTattoos() {
  const categoriesData = [...tattooCategories];

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold" style={{ paddingHorizontal: 16 }}>
        More styles
      </Text>
      <LegendList
        horizontal
        data={categoriesData}
        keyExtractor={(item) => `category-${item.id.toString()}`}
        renderItem={({ item: category }) => (
          <VerticalCard
            style={category}
            subtitle={category.title}
            imageStyle={{
              width: 160,
            }}
            href={{
              pathname: "/(tabs)/(home)/about/style",
              params: {
                style: category.id,
              },
            }}
            onPress={() => {
              customEvent("category_selected", {
                categoryId: category.id,
                categoryName: category.title,
                section: "more_styles",
              });
            }}
          />
        )}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        recycleItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
});
