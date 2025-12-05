import { tattooCategories } from "@/lib/celebrity-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export function CelebrityTattoos() {
  const categoriesData = [...tattooCategories];

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold">
        Athletic Tattoos
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
            onPress={() =>
              router.push({
                pathname: "/(tabs)/(home)/about/style",
                params: {
                  style: category.id,
                },
              })
            }
          />
        )}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
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
