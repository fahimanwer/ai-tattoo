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
    router.push("/home/new");
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
        <Text type="title" weight="bold" style={styles.title}>
          Your Tattoo is Ready!
        </Text>
        <Text type="default" style={styles.subtitle}>
          This is how your design would look applied
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          cachePolicy="memory-disk"
          source={{ uri: imageUri }}
          style={styles.resultImage}
          contentFit="cover"
          contentPosition="center"
          transition={1000}
          placeholder={{ blurhash }}
        />
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.buttonGrid}>
          <Button
            symbol="square.and.arrow.down"
            variant="solid"
            color="white"
            title="Save to Gallery"
            onPress={saveToLibrary}
            style={styles.primaryButton}
            haptic
            radius="full"
          />
          <Button
            symbol="arrow.clockwise"
            variant="outline"
            color="white"
            title="Generate Another"
            onPress={generateAnother}
            style={styles.secondaryButton}
            radius="full"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 12,
    gap: 1,
  },
  title: {
    textAlign: "center",
    color: Color.grayscale[950],
  },
  subtitle: {
    textAlign: "center",
    color: Color.grayscale[950] + "80",
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
  },
  resultImage: {
    width: "100%",
    height: 360,
    borderRadius: 16,
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
