import { useSubscription } from "@/hooks/useSubscription";
import { ApiError } from "@/lib/api-client";
import { textToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function TextToImage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { refreshSubscriptionStatus } = useSubscription();

  const mutation = useMutation({
    mutationFn: async () =>
      textToImage({
        prompt:
          // "Ultra-realistic photograph of a Japanese Yakuza traditional tattoo on a man's neck. The design follows the natural curvature of the throat and collarbones, with flowing waves and bold lines. Motifs include koi fish and cherry blossoms, rich colors and strong outlines, captured under natural light to show realistic skin texture and depth.",
          "Generate a minimalistic tattoo of brackets [] for a programmer, tatto shuld be in the neck rotated 45 degrees to the right",
      }),
    onSuccess: async (data) => {
      if (data.imageData) {
        setGeneratedImage(`data:image/png;base64,${data.imageData}`);

        // Invalidate usage query to reflect updated usage count
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });

        // Refresh subscription status in case usage limits changed subscription behavior
        try {
          await refreshSubscriptionStatus();
        } catch (error) {
          console.warn("Failed to refresh subscription status:", error);
        }
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
          <Text style={{ color: "#c62828", fontSize: 14 }}>
            {JSON.stringify(mutation.error, null, 2)}
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
