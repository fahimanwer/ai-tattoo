import { useTheme } from "@/src/context/ThemeContext";
import Share from "@/patches/rn-share-re-export";
import { GeneratedTattoo } from "@/src/types/tattoo";
import {
  GlassContainer,
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import { useThemeColor } from "heroui-native";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

interface TattooModalProps {
  tattoo: GeneratedTattoo | null;
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function TattooModal({ tattoo, visible, onClose }: TattooModalProps) {
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground");

  if (!tattoo) return null;

  const handleFavoritePress = () => {
    // TODO: Implement favorite functionality
    console.log("Favorite tattoo");
  };

  const handleSharePress = async () => {
    if (!tattoo || !Share) return;

    try {
      await Share.open({
        message: "https://fahimanwer.com/tattooai",
        url: `data:image/png;base64,${tattoo.imageData}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: isDark
              ? "rgba(0,0,0,0.9)"
              : "rgba(0,0,0,0.5)",
          },
        ]}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View
          style={[
            styles.container,
            {
              backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text type="lg" weight="bold" style={{ color: foreground, marginBottom: 4 }}>
                {tattoo.style}
              </Text>
              <Text
                type="sm"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.6)",
                  marginBottom: 4,
                }}
              >
                {tattoo.bodyPart} • {formatDate(tattoo.generationDate)}
              </Text>
              {tattoo.isOwnData && (
                <Text type="xs" style={styles.ownDataText}>
                  Generated from your own photo
                </Text>
              )}
            </View>

            <Pressable
              onPress={onClose}
              style={[
                styles.closeButton,
                {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.06)",
                },
              ]}
            >
              <Icon symbol="xmark" style={styles.closeIcon} color={foreground} />
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
                      color={tattoo.isFavorite ? "#FF3B30" : foreground}
                    />
                  </Pressable>
                </GlassView>

                <GlassView style={styles.actionButton} isInteractive>
                  <Pressable onPress={handleSharePress}>
                    <Icon
                      symbol="square.and.arrow.up"
                      style={styles.actionIcon}
                      color={foreground}
                    />
                  </Pressable>
                </GlassView>
              </GlassContainer>
            ) : (
              <View style={styles.fallbackActions}>
                <Pressable
                  onPress={handleFavoritePress}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.06)",
                    },
                  ]}
                >
                  <Icon
                    symbol={tattoo.isFavorite ? "heart.fill" : "heart"}
                    style={styles.actionIcon}
                    color={tattoo.isFavorite ? "#FF3B30" : foreground}
                  />
                </Pressable>

                <Pressable
                  onPress={handleSharePress}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.06)",
                    },
                  ]}
                >
                  <Icon
                    symbol="square.and.arrow.up"
                    style={styles.actionIcon}
                    color={foreground}
                  />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    borderRadius: 16,
    overflow: "hidden",
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
    marginBottom: 4,
  },
  subtitle: {
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
});
