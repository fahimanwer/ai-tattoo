import { useTattooHistory } from "@/context/TattooHistoryContext";
import {
  GlassContainer,
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

interface TattooDetailScreenProps {
  tattooId: string;
}

export function TattooDetailScreen({ tattooId }: TattooDetailScreenProps) {
  const { tattoos, toggleFavorite } = useTattooHistory();

  const tattoo = tattoos.find((t) => t.id === tattooId);

  if (!tattoo) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <Icon symbol="xmark" style={styles.closeIcon} color="white" />
          </Pressable>
        </View>
        <View style={styles.errorContainer}>
          <Text type="lg" weight="bold" style={styles.errorText}>
            Tattoo not found
          </Text>
        </View>
      </View>
    );
  }

  const handleFavoritePress = () => {
    toggleFavorite(tattoo.id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Icon symbol="xmark" style={styles.closeIcon} color="white" />
        </Pressable>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `data:image/png;base64,${tattoo.imageData}` }}
          style={styles.image}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {isLiquidGlassAvailable() ? (
          <GlassContainer spacing={16}>
            <GlassView style={styles.actionButton} isInteractive>
              <Pressable onPress={handleFavoritePress}>
                <Icon
                  symbol={tattoo.isFavorite ? "heart.fill" : "heart"}
                  style={styles.actionIcon}
                  color={tattoo.isFavorite ? "#FF3B30" : "white"}
                />
              </Pressable>
            </GlassView>

            <GlassView style={styles.actionButton} isInteractive>
              <Pressable
                onPress={() => {
                  // TODO: Implement share functionality
                  console.log("Share tattoo");
                }}
              >
                <Icon
                  symbol="square.and.arrow.up"
                  style={styles.actionIcon}
                  color="white"
                />
              </Pressable>
            </GlassView>
          </GlassContainer>
        ) : (
          <View style={styles.fallbackActions}>
            <Pressable
              onPress={handleFavoritePress}
              style={[styles.actionButton, styles.fallbackButton]}
            >
              <Icon
                symbol={tattoo.isFavorite ? "heart.fill" : "heart"}
                style={styles.actionIcon}
                color={tattoo.isFavorite ? "#FF3B30" : "white"}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                // TODO: Implement share functionality
                console.log("Share tattoo");
              }}
              style={[styles.actionButton, styles.fallbackButton]}
            >
              <Icon
                symbol="square.and.arrow.up"
                style={styles.actionIcon}
                color="white"
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 16,
  },
  headerInfo: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  ownDataText: {
    color: "#007AFF",
    fontSize: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  imageContainer: {
    flex: 1,
    minHeight: 300,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    padding: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  fallbackActions: {
    flexDirection: "row",
    gap: 16,
  },
  fallbackButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});
