import { featuredTattoos } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export function CelebrityTattoos() {
  // For now, using featured tattoos as placeholder data
  // This can be replaced with actual celebrity tattoos data later
  const celebrityTattoos = [...featuredTattoos].slice(0, 6);

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold">
        Celebrity Tattoos
      </Text>
      <LegendList
        horizontal
        data={celebrityTattoos}
        keyExtractor={(item) => `celebrity-${item.id.toString()}`}
        renderItem={({ item: tattoo }) => (
          <VerticalCard
            style={tattoo}
            subtitle={tattoo.title}
            imageStyle={{
              width: 160,
            }}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/(home)/about/style",
                params: {
                  style: tattoo.id,
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



