import { cacheImageFromUrl } from "@/lib/image-cache";
import { InteractiveImage } from "@/src/components/ui/InteractiveImage";
import { Text } from "@/src/components/ui/Text";
import { useTheme } from "@/src/context/ThemeContext";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useThemeColor } from "heroui-native";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { PressableScale } from "pressto";
import { useTranslation } from "react-i18next";
import { use, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ImagePreview() {
  const params = useLocalSearchParams<{
    imageUrl: string;
    styleId?: string;
  }>();

  const {
    setSessionGenerations,
    setActiveGenerationIndex,
    activeGenerationIndex,
    sessionGenerations,
  } = use(PlaygroundContext);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground");
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleUseTattoo = async () => {
    setIsLoading(true);

    try {
      // Download image from S3 directly to disk (skips base64 intermediate step)
      // This is more efficient: URL → file instead of URL → base64 → file
      const fileUri = await cacheImageFromUrl(params.imageUrl, "jpg");

      // Store only the file URI (not the base64) to minimize memory usage
      // Check if we can add to the active group (max 2 images per group)
      const canAddToActiveGroup =
        activeGenerationIndex !== undefined &&
        sessionGenerations[activeGenerationIndex].length < 2;

      if (canAddToActiveGroup) {
        // Add to existing group (max 2 images)
        setSessionGenerations((prev) => {
          const newGenerations = [...prev];
          newGenerations[activeGenerationIndex] = [
            ...newGenerations[activeGenerationIndex],
            fileUri,
          ];
          return newGenerations;
        });
      } else {
        // Create a new group with this single image
        setSessionGenerations((prev) => {
          const newGenerations = [...prev, [fileUri]];
          // Set active index to the newly added image
          setActiveGenerationIndex(newGenerations.length - 1);
          return newGenerations;
        });
      }

      // Navigate to playground
      router.dismissTo("/(playground)");
    } catch (error) {
      console.error("Error using tattoo:", error);
      Alert.alert(t('common.error'), t('imagePreview.useTattooError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!params.imageUrl) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: isDark ? "#000" : "#F5F5F7" },
        ]}
      >
        <Text type="lg" weight="bold" style={{ color: foreground }}>
          {t('imagePreview.imageNotFound')}
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: Platform.OS === "ios" ? "transparent" : isDark ? "#000" : "#F5F5F7",
          },
          headerTransparent: Platform.OS === "ios",
          headerShadowVisible: false,
          headerLargeTitle: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: foreground,
          ...(Platform.OS === "ios"
            ? {
                unstable_headerRightItems: () => [
                  {
                    labelStyle: { fontWeight: "bold" },
                    type: "button",
                    label: isLoading ? t('common.loading') : t('imagePreview.useTattoo'),
                    onPress: handleUseTattoo,
                    variant: "prominent",
                    tintColor: "#3563E9",
                    disabled: isLoading,
                  },
                ],
              }
            : {
                headerRight: () => null,
              }),
        }}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000" : "#F5F5F7" },
        ]}
      >
        {/* Interactive Image */}
        <Link.AppleZoomTarget>
          <View style={styles.imageContainer}>
            <InteractiveImage uri={params.imageUrl} />
          </View>
        </Link.AppleZoomTarget>

        {/* Android floating Use Tattoo button */}
        {Platform.OS !== "ios" && (
          <PressableScale
            onPress={isLoading ? undefined : handleUseTattoo}
            style={[
              styles.useTattooButton,
              { top: top + 8 },
              isLoading && { opacity: 0.6 },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text weight="bold" type="sm" style={styles.useTattooLabel}>
                {t('imagePreview.useTattoo')}
              </Text>
            )}
          </PressableScale>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  useTattooButton: {
    position: "absolute",
    right: 16,
    backgroundColor: "#3563E9",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 10,
    elevation: 4,
  },
  useTattooLabel: {
    color: "#fff",
  },
});
