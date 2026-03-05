/**
 * CombineFlow -- iOS shell with native header items.
 * Picks up to 4 images, optional description, generates a combined design.
 */

import { BLURHASH } from "@/lib/image-cache";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, useThemeColor } from "heroui-native";
import { PressableScale } from "pressto";
import { Ionicons } from "@expo/vector-icons";
import { FlowResultActions } from "./FlowResultActions";
import { useCombineFlow } from "./useCombineFlow";
import { extractConvexError } from "@/lib/convex-error";
import {
  getPlaygroundErrorType,
  PlaygroundError,
} from "../shared/PlaygroundError";

export function CombineFlow() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const foreground = useThemeColor("foreground") as string;
  const muted = useThemeColor("muted") as string;

  const {
    imageUris,
    description,
    setDescription,
    resultUri,
    isGenerating,
    error,
    addImage,
    removeImage,
    generate,
    reset,
    mutation,
    maxImages,
  } = useCombineFlow();

  function dismissToHome() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/(home)");
    }
  }

  if (error) {
    const { code, message } = extractConvexError(error);
    const errorType = getPlaygroundErrorType(code, !hasActiveSubscription);
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: t("flows.combine.title"),
            headerShadowVisible: false,
          }}
        />
        <PlaygroundError
          errorType={errorType}
          errorMessage={message}
          onDismiss={() => mutation.reset()}
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("flows.combine.title"),
          headerShadowVisible: false,
          unstable_headerLeftItems: () => [
            {
              type: "button",
              variant: "plain",
              label: t("common.back"),
              icon: { name: "chevron.left", type: "sfSymbol" },
              onPress: dismissToHome,
            },
          ],
          unstable_headerRightItems: () =>
            resultUri
              ? []
              : [
                  {
                    type: "button",
                    variant: "plain",
                    label: t("common.retry"),
                    icon: { name: "arrow.counterclockwise", type: "sfSymbol" },
                    onPress: reset,
                  },
                ],
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Image grid */}
        {!resultUri && (
          <>
            <Text type="sm" style={{ color: muted, textAlign: "center" }}>
              {t("flows.combine.maxImages", { max: maxImages })}
            </Text>

            <View style={styles.imageGrid}>
              {imageUris.map((uri, index) => (
                <View key={uri} style={styles.imageCell}>
                  <PressableScale
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                      removeImage(index);
                    }}
                  >
                    <Image
                      source={{ uri }}
                      placeholder={{ blurhash: BLURHASH }}
                      cachePolicy="memory-disk"
                      style={styles.image}
                      contentFit="cover"
                      transition={300}
                    />
                    <View style={styles.removeOverlay}>
                      <Ionicons name="close" size={16} color="white" />
                    </View>
                  </PressableScale>
                </View>
              ))}

              {imageUris.length < maxImages && (
                <PressableScale
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    addImage();
                  }}
                  style={[
                    styles.imageCell,
                    styles.addButton,
                    {
                      borderColor: isDark ? Color.zinc[700] : Color.zinc[300],
                    },
                  ]}
                >
                  <Ionicons
                    name="add"
                    size={32}
                    color={isDark ? Color.zinc[400] : Color.zinc[500]}
                  />
                  <Text
                    type="xs"
                    style={{
                      color: isDark ? Color.zinc[400] : Color.zinc[500],
                    }}
                  >
                    {imageUris.length === 0
                      ? t("flows.combine.addImages")
                      : t("flows.combine.addMore")}
                  </Text>
                </PressableScale>
              )}
            </View>

            {/* Description input */}
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder={t("flows.combine.describeResult")}
              placeholderTextColor={
                isDark ? Color.zinc[500] : Color.zinc[400]
              }
              multiline
              style={[
                styles.textInput,
                {
                  color: foreground,
                  backgroundColor: isDark
                    ? Color.zinc[800]
                    : Color.zinc[100],
                  borderColor: isDark ? Color.zinc[700] : Color.zinc[200],
                },
              ]}
            />

            {/* Generate button */}
            <Button
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                generate();
              }}
              isDisabled={imageUris.length < 2 || isGenerating}
              style={styles.generateButton}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Button.Label>{t("flows.combine.title")}</Button.Label>
              )}
            </Button>
          </>
        )}

        {/* Loading state */}
        {isGenerating && !resultUri && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={isDark ? Color.zinc[400] : Color.zinc[600]}
            />
            <Text type="sm" style={{ color: muted, textAlign: "center" }}>
              {t("playground.loadingMessages.brewingMasterpiece")}
            </Text>
          </View>
        )}

        {/* Result display */}
        {resultUri && (
          <View style={styles.resultContainer}>
            <Image
              source={{ uri: resultUri }}
              placeholder={{ blurhash: BLURHASH }}
              cachePolicy="memory-disk"
              style={styles.resultImage}
              contentFit="cover"
              transition={400}
            />
            <FlowResultActions resultUri={resultUri} />
            <Button
              variant="secondary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                reset();
              }}
              style={styles.resetButton}
            >
              <Button.Label>{t("common.tryAgain")}</Button.Label>
            </Button>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  imageCell: {
    width: "47%",
    flexGrow: 1,
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  removeOverlay: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    fontSize: 15,
    minHeight: 60,
    textAlignVertical: "top",
  },
  generateButton: {
    width: "100%",
    borderRadius: 14,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 16,
  },
  resultContainer: {
    gap: 16,
    alignItems: "center",
  },
  resultImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
  resetButton: {
    width: "100%",
    borderRadius: 14,
  },
});
