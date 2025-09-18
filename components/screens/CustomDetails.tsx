import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export function CustomDetails() {
  const { customInstructions, setCustomInstructions } = useTattooCreation();
  const router = useRouter();

  const handleInstructionsChange = useCallback(
    (text: string) => {
      setCustomInstructions(text);
    },
    [setCustomInstructions]
  );

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
        <View style={styles.navigationButtons}>
          {/* <Button
            title="Back"
            variant="outline"
            radius="full"
            color="gray"
            onPress={previousStep}
            style={styles.navButton}
          /> */}
          <Button
            symbol="wand.and.sparkles"
            title="Create Tattoo"
            variant="solid"
            radius="full"
            color="orange"
            onPress={() => router.push("/home/new/create-tattoo")}
          />
        </View>
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
