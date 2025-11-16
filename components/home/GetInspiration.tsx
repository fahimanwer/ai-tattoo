import { Text } from "@/components/ui/Text";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export function GetInspiration() {
  const inspirationStyles = featuredTattoos.slice(0, 8);

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold">
        Discover new styles
      </Text>
      {/* <GlassContainerDemo /> */}
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {inspirationStyles.map((style) => (
          <VerticalCard
            key={style.id}
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
        ))}
      </ScrollView>
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
