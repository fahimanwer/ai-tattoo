import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface GeneratedTattooResultProps {
  generatedImageUri?: string;
}

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function GeneratedTattooResult({
  generatedImageUri,
}: GeneratedTattooResultProps) {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get image URI from props or route params
  const imageUri = generatedImageUri || (params.imageUri as string);

  // Remove custom back handling - let normal navigation work
  // The confirmation alert will be handled in the New.tsx component

  const saveToLibrary = async () => {
    if (imageUri) {
      try {
        await saveBase64ToAlbum(imageUri, "png");
        Alert.alert(
          "Saved!",
          "Your tattoo design has been saved to your photo gallery."
        );
      } catch (error) {
        Alert.alert("Error", "Unable to save image. Please try again.");
        console.error("Error saving to library:", error);
      }
    }
  };

  const generateAnother = () => {
    router.back();
  };

  const shareResult = () => {
    // TODO: Implement sharing functionality
    Alert.alert("Share", "Share functionality coming soon");
  };

  if (!imageUri) {
    return (
      <View style={styles.errorContainer}>
        <Text type="subtitle" weight="bold" style={styles.errorText}>
          Image not found
        </Text>
        <Text type="body" style={styles.errorDescription}>
          There was a problem loading your tattoo design.
        </Text>
        <Button
          title="Back"
          variant="outline"
          color="orange"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text type="title" weight="bold">
          Your Tattoo is Ready!
        </Text>
        <Text type="body">This is how your design would look applied</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.resultImage}
          contentFit="contain"
          transition={300}
          placeholder={{ blurhash }}
        />
      </View>

      <View style={styles.actionsContainer}>
        <Text type="body" weight="semibold">
          What do you want to do now?
        </Text>

        <View style={styles.buttonGrid}>
          <Button
            symbol="square.and.arrow.down"
            variant="solid"
            color="blue"
            title="Save to Gallery"
            onPress={saveToLibrary}
            style={styles.primaryButton}
            haptic
          />

          <Button
            symbol="square.and.arrow.up"
            variant="outline"
            color="green"
            title="Share"
            onPress={shareResult}
            style={styles.secondaryButton}
          />

          <Button
            symbol="arrow.clockwise"
            variant="outline"
            color="orange"
            title="Generate Another"
            onPress={generateAnother}
            style={styles.secondaryButton}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text type="caption" style={styles.infoText}>
            💡 <Text weight="semibold">Tip:</Text> Save this image and show it
            to your tattoo artist to get the best result.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: Color.gray[900],
  },
  subtitle: {
    textAlign: "center",
    color: Color.gray[600],
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: Color.gray[50],
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultImage: {
    width: screenWidth - 64,
    height: screenWidth - 64,
    borderRadius: 16,
    maxWidth: 400,
    maxHeight: 400,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsTitle: {
    textAlign: "center",
    marginBottom: 16,
    color: Color.gray[800],
  },
  buttonGrid: {
    gap: 12,
  },
  primaryButton: {
    width: "100%",
  },
  secondaryButton: {
    width: "100%",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: Color.blue[50],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Color.blue[100],
  },
  infoText: {
    color: Color.blue[700],
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  errorText: {
    color: Color.red[600],
    textAlign: "center",
  },
  errorDescription: {
    color: Color.gray[600],
    textAlign: "center",
  },
});
