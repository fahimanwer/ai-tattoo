import { useTattooHistory } from "@/context/TattooHistoryContext";
import { GeneratedTattoo } from "@/types/tattoo";
import {
  GlassContainer,
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

interface TattooCardProps {
  tattoo: GeneratedTattoo;
  onPress: () => void;
}

export function TattooCard({ tattoo, onPress }: TattooCardProps) {
  const { toggleFavorite } = useTattooHistory();

  const handleFavoritePress = () => {
    toggleFavorite(tattoo.id);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <Image
        source={{ uri: `data:image/png;base64,${tattoo.imageData}` }}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
      />

      {/* Overlay with info */}
      <View style={styles.overlay}>
        <View style={styles.infoContainer}>
          <Text type="sm" weight="semibold" style={styles.styleText}>
            {tattoo.style}
          </Text>
          <Text type="xs" style={styles.bodyPartText}>
            {tattoo.bodyPart}
          </Text>
          {tattoo.isOwnData && (
            <Text type="xs" style={styles.ownDataText}>
              Own Data
            </Text>
          )}
        </View>

        {/* Favorite button */}
        <View style={styles.actionsContainer}>
          {isLiquidGlassAvailable() ? (
            <GlassContainer spacing={8}>
              <GlassView style={styles.favoriteButton} isInteractive>
                <Pressable onPress={handleFavoritePress}>
                  <Icon
                    symbol={tattoo.isFavorite ? "heart.fill" : "heart"}
                    style={styles.favoriteIcon}
                    color={tattoo.isFavorite ? "#FF3B30" : "white"}
                  />
                </Pressable>
              </GlassView>
            </GlassContainer>
          ) : (
            <Pressable
              onPress={handleFavoritePress}
              style={[styles.favoriteButton, styles.fallbackButton]}
            >
              <Icon
                symbol={tattoo.isFavorite ? "heart.fill" : "heart"}
                style={styles.favoriteIcon}
                color={tattoo.isFavorite ? "#FF3B30" : "white"}
              />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1C1C1E",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  infoContainer: {
    marginBottom: 8,
  },
  styleText: {
    color: "white",
    marginBottom: 2,
  },
  bodyPartText: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  ownDataText: {
    color: "#007AFF",
    fontSize: 10,
  },
  actionsContainer: {
    alignItems: "flex-end",
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  favoriteIcon: {
    width: 16,
    height: 16,
  },
});
