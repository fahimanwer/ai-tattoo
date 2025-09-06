import { ApiError } from "@/lib/api-client";
import { textToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function Dev() {
  // Access the client
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () =>
      textToImage({
        prompt:
          // "Ultra-realistic photograph of a Japanese Yakuza traditional tattoo on a man's neck. The design follows the natural curvature of the throat and collarbones, with flowing waves and bold lines. Motifs include koi fish and cherry blossoms, rich colors and strong outlines, captured under natural light to show realistic skin texture and depth.",
          "Generate a minimalistic tattoo of brackets [] for a programmer, tatto shuld be in the neck rotated 45 degrees to the right",
      }),
    onSuccess: async (data) => {
      console.log("client", "mutation was successful");

      // This is base64 (not very useful to show it in the console)

      // Set the generated image data for display
      if (data.imageData) {
        setGeneratedImage(`data:image/png;base64,${data.imageData}`);
      }
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error(
          "client",
          "mutation failed",
          error.message,
          error.details
        );
      } else {
        console.error("client", "mutation failed", error);
      }
      setGeneratedImage(null);
    },
  });

  const saveToLibrary = async () => {
    if (generatedImage) {
      await saveBase64ToAlbum(generatedImage, "png");
      Alert.alert("Saved to Library");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text>A realistic Japanese Yakuza</Text>

      <Button
        onPress={() => {
          setGeneratedImage(null);
          mutation.mutate();
        }}
        title={mutation.isPending ? "Generating..." : "Text to Image"}
        disabled={mutation.isPending}
      />

      {mutation.isSuccess && (
        <Button
          symbol="square.and.arrow.down"
          variant="solid"
          color="white"
          onPress={saveToLibrary}
          title="Save to Library"
          disabled={mutation.isPending}
        />
      )}

      {mutation.isPending && (
        <View style={{ alignItems: "center", padding: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Generating image...</Text>
        </View>
      )}

      {mutation.isError && (
        <View
          style={{
            padding: 16,
            backgroundColor: "#ffebee",
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: "#c62828",
          }}
        >
          <Text
            style={{
              color: "#c62828",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {mutation.error?.message?.startsWith("Validation Error:")
              ? "❌ Invalid Request"
              : "⚠️ Generation Failed"}
          </Text>
          <Text style={{ color: "#c62828", fontSize: 14 }}>
            {mutation.error?.message || "Failed to generate image"}
          </Text>
        </View>
      )}

      {generatedImage && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
            Generated Image:
          </Text>
          <Image
            source={{ uri: generatedImage }}
            style={{ width: 300, height: 300, borderRadius: 8 }}
            contentFit="contain"
            transition={200}
          />
        </View>
      )}
    </ScrollView>
  );
}
