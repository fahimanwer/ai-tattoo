import { useTattooCreation } from "@/context/TattooCreationContext";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function TattooResultScreen() {
  const router = useRouter();
  const { 
    options, 
    selectedPhoto, 
    setCurrentStep,
    getFormData,
    isComplete,
    reset
  } = useTattooCreation();
  
  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);
  
  const handleSubmit = async () => {
    if (!isComplete()) {
      Alert.alert(
        "Incomplete Form", 
        "Please complete all required fields before submitting."
      );
      return;
    }
    
    const formData = getFormData();
    
    // TODO: Implement API call to submit tattoo request
    console.log("Submitting tattoo request:", formData);
    
    Alert.alert(
      "Success!", 
      "Your tattoo request has been submitted. We'll process it and show you the result soon!",
      [
        {
          text: "OK",
          onPress: () => {
            reset();
            router.push("/home");
          }
        }
      ]
    );
  };
  
  const handleEdit = () => {
    router.back();
  };
  
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
    >
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Review Your Selection
        </Text>
        <Text type="body">
          Please review your tattoo selection before submitting
        </Text>
      </View>
      
      {/* Selected Tattoo */}
      {options.selectedTattoo && (
        <View style={styles.section}>
          <Text type="body" weight="semibold">
            Tattoo Style
          </Text>
          <View style={styles.card}>
            <Image
              source={options.selectedTattoo.image}
              style={styles.tattooImage}
              contentFit="contain"
            />
            <Text type="body" weight="bold" style={{ marginTop: 8 }}>
              {options.selectedTattoo.title}
            </Text>
            <Text type="caption" style={{ marginTop: 4 }}>
              {options.selectedTattoo.description}
            </Text>
          </View>
        </View>
      )}
      
      {/* Selected Photo */}
      {selectedPhoto && (
        <View style={styles.section}>
          <Text type="body" weight="semibold">
            Your Photo
          </Text>
          <View style={styles.card}>
            <Image
              source={{ uri: selectedPhoto.uri }}
              style={styles.userPhoto}
              contentFit="cover"
            />
          </View>
        </View>
      )}
      
      {/* Options */}
      <View style={styles.section}>
        <Text type="body" weight="semibold">
          Options
        </Text>
        <View style={styles.optionRow}>
          <Text type="body">Color:</Text>
          <Text type="body" weight="medium">
            {options.colorOption === "color" ? "Color" : "Black & White"}
          </Text>
        </View>
        <View style={styles.optionRow}>
          <Text type="body">Privacy:</Text>
          <Text type="body" weight="medium">
            {options.isPrivate ? "Private" : "Public"}
          </Text>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Selection"
          variant="outline"
          color="gray"
          onPress={handleEdit}
          style={styles.button}
        />
        <Button
          title="Generate Tattoo"
          variant="solid"
          color="orange"
          symbol="sparkles"
          haptic
          onPress={handleSubmit}
          disabled={!isComplete()}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    gap: 8,
  },
  card: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  tattooImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  userPhoto: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(128, 128, 128, 0.05)",
    borderRadius: 8,
    marginTop: 4,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 32,
    marginBottom: 20,
  },
  button: {
    width: "100%",
  },
});
