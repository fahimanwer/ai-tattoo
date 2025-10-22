import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { Button as ExpoUIButton, Host } from "@expo/ui/swift-ui";
import { fixedSize } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export function CustomDetails() {
  const {
    customInstructions,
    setCustomInstructions,
    selectedBodyPartCategory,
    selectedBodyPartVariant,
    customUserImage,
    isUsingCustomImage,
    selectedTattooImage,
    existingTattooImage,
    isUsingExistingTattoo,
    options,
  } = useTattooCreation();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(false);

  // Check usage limits
  const {
    canCreateTattoo,
    isLimitReached,
    limitMessage,
    subscriptionTier,
    used,
    limit,
  } = useUsageLimit();

  const handleInstructionsChange = useCallback(
    (text: string) => {
      setCustomInstructions(text);
    },
    [setCustomInstructions]
  );

  const handleUpgrade = useCallback(async () => {
    try {
      router.push("/(paywall)");
    } catch (error) {
      console.error("Error presenting paywall:", error);
      // Fallback to profile page
      router.replace("/(tabs)/profile");
    }
  }, [router]);

  const handleCreateTattoo = useCallback(() => {
    setIsValidating(true);

    // Check usage limits first
    if (!canCreateTattoo) {
      const title = isLimitReached
        ? "Usage Limit Reached"
        : "Cannot Create Tattoo";
      const message =
        subscriptionTier === "free"
          ? `You've used ${used}/${limit} generations this month. Upgrade to a paid plan to continue creating tattoos.`
          : `You've reached your monthly limit of ${limit} generations. Your plan will reset next month.`;

      Alert.alert(
        title,
        message,
        subscriptionTier === "free"
          ? [
              {
                text: "View Plans",
                onPress: () => router.push("/(tabs)/profile"),
              },
              { text: "Cancel", style: "cancel" },
            ]
          : [{ text: "OK" }]
      );
      setIsValidating(false);
      return;
    }

    // Validate body part selection
    const hasBodyPart = isUsingCustomImage
      ? !!customUserImage
      : !!(selectedBodyPartCategory && selectedBodyPartVariant);

    if (!hasBodyPart) {
      Alert.alert(
        "Missing Body Part",
        "Please select a body part or upload a custom image before creating your tattoo.",
        [{ text: "OK" }]
      );
      setIsValidating(false);
      return;
    }

    // Validate tattoo style selection
    const hasTattooStyle = isUsingExistingTattoo
      ? !!existingTattooImage
      : !!selectedTattooImage;

    if (!hasTattooStyle) {
      Alert.alert(
        "Missing Tattoo Style",
        "Please select a tattoo style before creating your tattoo.",
        [{ text: "OK" }]
      );
      setIsValidating(false);
      return;
    }

    // Validate tattoo selection in options
    if (!options.selectedTattoo) {
      Alert.alert(
        "Missing Tattoo Selection",
        "Please select a tattoo style from the options.",
        [{ text: "OK" }]
      );
      setIsValidating(false);
      return;
    }

    // All validations passed, navigate to generation result screen
    setIsValidating(false);
    router.push("/(new)/generation-result");
  }, [
    canCreateTattoo,
    isLimitReached,
    subscriptionTier,
    used,
    limit,
    isUsingCustomImage,
    customUserImage,
    selectedBodyPartCategory,
    selectedBodyPartVariant,
    isUsingExistingTattoo,
    existingTattooImage,
    selectedTattooImage,
    options.selectedTattoo,
    router,
  ]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {/* Custom Instructions Section */}
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Custom instructions
        </Text>
      </View>

      <View style={[styles.instructionsContainer, { marginTop: 12 }]}>
        <Input
          placeholder="A little bit of details..."
          value={customInstructions}
          onChangeText={handleInstructionsChange}
          multiline
          numberOfLines={3}
          style={styles.instructionsInput}
          color="white"
        />
        <Text type="caption" style={styles.instructionsHint}>
          (Optional) Add specific instructions about where to place the tattoo
          or any other details you want to include.
        </Text>
      </View>

      {/* Usage Display */}
      <View style={styles.usageContainer}>
        <View style={styles.usageCard}>
          <Text type="caption" style={styles.usageLabel}>
            Usage This Period
          </Text>
          <Text
            type="subtitle"
            weight="bold"
            style={[
              styles.usageText,
              {
                color: isLimitReached
                  ? Color.red[400]
                  : subscriptionTier === "plus"
                  ? Color.green[400]
                  : subscriptionTier === "pro"
                  ? Color.blue[400]
                  : subscriptionTier === "starter"
                  ? Color.orange[400]
                  : Color.gray[300],
              },
            ]}
          >
            {used}/{limit}
          </Text>
          <Text
            type="caption"
            style={[
              styles.usageMessage,
              { color: isLimitReached ? Color.red[400] : Color.gray[400] },
            ]}
          >
            {limitMessage}
          </Text>

          {/* CTA Button for upgrades */}
          {(isLimitReached || subscriptionTier === "free") && (
            <Host matchContents style={{ marginTop: 16, width: "100%" }}>
              <ExpoUIButton
                systemImage={
                  isLimitReached ? "crown.fill" : "arrow.up.circle.fill"
                }
                controlSize="regular"
                variant="borderedProminent"
                onPress={handleUpgrade}
                modifiers={[fixedSize()]}
              >
                {isLimitReached ? "Upgrade Now" : "View Plans"}
              </ExpoUIButton>
            </Host>
          )}
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <Host matchContents style={{ alignSelf: "center" }}>
          <ExpoUIButton
            systemImage="wand.and.sparkles"
            controlSize="large"
            variant="glassProminent"
            onPress={handleCreateTattoo}
            modifiers={[fixedSize()]}
            disabled={isValidating || isLimitReached}
          >
            {isValidating
              ? "Validating..."
              : isLimitReached
              ? "Limit Reached"
              : "Create Tattoo"}
          </ExpoUIButton>
        </Host>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
  },
  instructionsContainer: {
    height: "auto",
    paddingHorizontal: 16,
  },
  instructionsInput: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  instructionsHint: {
    marginTop: 12,
    color: Color.gray[500],
    fontStyle: "italic",
  },
  usageContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  usageCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  usageLabel: {
    color: Color.gray[400],
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 11,
  },
  usageText: {
    marginBottom: 6,
    fontSize: 28,
  },
  usageMessage: {
    textAlign: "center",
    lineHeight: 18,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
