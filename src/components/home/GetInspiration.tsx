import { featuredTattoos } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export function GetInspiration() {
  const inspirationStyles = [...featuredTattoos].reverse();

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold">
        Discover new styles
      </Text>
      {/* <GlassContainerDemo /> */}
      <LegendList
        horizontal
        data={inspirationStyles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: style }) => (
          <VerticalCard
            style={style}
            imageStyle={{
              width: 160,
            }}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/(home)/about/style",
                params: {
                  style: style.id,
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
