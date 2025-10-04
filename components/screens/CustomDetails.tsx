import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
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

  const handleInstructionsChange = useCallback(
    (text: string) => {
      setCustomInstructions(text);
    },
    [setCustomInstructions]
  );

  const handleCreateTattoo = useCallback(() => {
    setIsValidating(true);

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

    // All validations passed, navigate to creation screen
    setIsValidating(false);
    router.push("/(new)/create-tattoo");
  }, [
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

      {/* Color Selection Section */}
      {/*  <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Choose color
        </Text>
      </View>

      <View style={styles.colorSection}>
        <View style={styles.colorOptions}>
          <Button
            title="Color"
            variant={options.colorOption === "color" ? "solid" : "outline"}
            color={options.colorOption === "color" ? "white" : "gray"}
            onPress={() => updateOptions({ colorOption: "color" })}
            style={styles.colorButton}
            radius="full"
          />

          <Button
            title="Black & White"
            variant={options.colorOption === "blackwhite" ? "solid" : "outline"}
            color={options.colorOption === "blackwhite" ? "white" : "gray"}
            onPress={() => updateOptions({ colorOption: "blackwhite" })}
            style={styles.colorButton}
            radius="full"
          />
        </View>
      </View> */}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <Host matchContents style={{ alignSelf: "center" }}>
          <ExpoUIButton
            systemImage="wand.and.sparkles"
            controlSize="large"
            variant="glassProminent"
            onPress={handleCreateTattoo}
            modifiers={[fixedSize()]}
            disabled={isValidating}
          >
            {isValidating ? "Validating..." : "Create Tattoo"}
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
  colorSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  colorButton: {
    width: "48%",
  },
  detailsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  detailsText: {
    color: Color.gray[400],
    marginBottom: 8,
    lineHeight: 20,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
});
