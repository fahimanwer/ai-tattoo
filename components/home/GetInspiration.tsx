import { Text } from "@/components/ui/Text";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

function goToAboutStyle(style: FeaturedTattoo) {
  router.push(`/home/about-style?style=${style.id}`);
}

export function GetInspiration() {
  const [selectedStyle, setSelectedStyle] = useState<FeaturedTattoo | null>(
    null
  );

  const inspirationStyles = featuredTattoos.slice(0, 8);

  const handleStylePress = (style: FeaturedTattoo) => {
    setSelectedStyle(style);
    goToAboutStyle(style);
  };

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Text type="subtitle" weight="bold">
        Styles
      </Text>
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {inspirationStyles.map((style) => (
          <Pressable
            key={style.id}
            onPress={() => handleStylePress(style)}
            style={({ pressed }) => [
              styles.styleContainer,
              { transform: [{ scale: pressed ? 0.99 : 1 }] },
            ]}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 16,
                height: "100%",
                width: "100%",
                zIndex: 1,
              }}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0)"]}
                style={{ height: "100%", width: "100%", borderRadius: 16 }}
              />
            </View>
            <Image
              source={style.image}
              style={[styles.styleImage]}
              contentFit="cover"
            />
            <View style={styles.styleImageContainer}>
              <Text type="base" weight="bold">
                {style.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  description: {
    opacity: 0.7,
  },
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
  styleContainer: {
    position: "relative",
    marginRight: 12,
    alignItems: "center",
    gap: 6,
  },
  styleImage: {
    width: 240,
    height: 140,
    borderRadius: 16,
    borderWidth: 2,
  },
  styleImageContainer: {
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: 8,
    zIndex: 2,
    paddingHorizontal: 12,
  },
  selectedDescription: {
    textAlign: "center",
    opacity: 0.8,
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
});
