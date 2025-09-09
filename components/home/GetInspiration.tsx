import { Text } from "@/components/ui/Text";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

function goToAboutStyle(style: FeaturedTattoo) {
  router.push(`/home/about-style?style=${style.id}`);
}

export function GetInspiration() {
  const inspirationStyles = featuredTattoos.slice(0, 8);

  const handleStylePress = (style: FeaturedTattoo) => {
    goToAboutStyle(style);
  };

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Text type="subtitle" weight="bold">
        Discover new styles
      </Text>
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
            onPress={handleStylePress}
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
