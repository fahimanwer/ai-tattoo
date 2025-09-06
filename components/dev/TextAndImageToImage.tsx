import { ApiError } from "@/lib/api-client";
import { textAndImageToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function TextAndImageToImage() {
  // Access the client
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () =>
      textAndImageToImage({
        prompt: "",
        image_base64: "",
      }),
    onSuccess: async (data) => {
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
    <>
      <Text>
        Using this photo of my arm and the tattoo photo, generate an image
        showing how the tattoo would look on my arm.
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={require("@/assets/a.jpg")}
          style={{ width: "50%", height: 200, borderRadius: 8 }}
          contentFit="cover"
          transition={200}
        />
        <Image
          source={require("@/assets/tattoos/anime.png")}
          style={{ width: "50%", height: 200, borderRadius: 8 }}
          contentFit="cover"
          transition={200}
        />
      </View>
      <Button
        onPress={() => {
          setGeneratedImage(null);
          mutation.mutate();
        }}
        title={mutation.isPending ? "Generating..." : "Generate"}
        disabled={mutation.isPending}
        symbol="sparkles"
        variant="solid"
        color="blue"
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
    </>
  );
}
