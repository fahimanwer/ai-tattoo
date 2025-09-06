import { ApiError } from "@/lib/api-client";
import { textAndImageToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import { File } from "expo-file-system/next";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

const MIX_TOW_PHOTHOS_PROMPT = `A hyper-realistic integration of the uploaded tattoo design onto the uploaded body photo. The tattoo should follow the exact curvature and natural folds of the neck and collarbone, adapting seamlessly to the anatomy. The ink must look authentically healed into the skin: slightly diffused in pores, with natural wear, subtle fading in areas of tension, and matte tones rather than excessive shine. Shading and lines should curve and flow with the muscles and skin surface, never floating above it. Show fine details of skin texture such as pores, wrinkles, and light imperfections, blending with the tattoo ink. Lighting should remain soft and realistic, avoiding glossy or artificial effects, so the tattoo looks fully integrated and aged naturally. No background, only the tattooed body part in ultra-high resolution.`;
const bodyPartImage = "/a.jpg";
const tattooImage = "/tattoos/gothic.png";

/**
 * Convert a bundled static asset (require("../assets/img.png")) into Base64.
 */
export async function assetToBase64(moduleId: number): Promise<string> {
  // 1. Resolve the static asset
  const [asset] = await Asset.loadAsync(moduleId);
  const uri = asset.localUri ?? asset.uri;
  if (!uri) throw new Error("Unable to resolve asset URI");

  // 2. Wrap the path with File
  const file = new File(uri);

  // 3. Read as Base64
  const base64 = file.base64(); // synchronous, returns string
  return base64;
}

export function TextAndImageToImage() {
  // Access the client
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [armBase64, setArmBase64] = useState<string | null>(null);
  const [tattooBase64, setTattooBase64] = useState<string | null>(null);

  // Preload + convert both assets to Base64 once
  useEffect(() => {
    (async () => {
      try {
        const [arm, tattoo] = await Promise.all([
          assetToBase64(require(`@/assets${bodyPartImage}`)),
          assetToBase64(require(`@/assets${tattooImage}`)),
        ]);
        setArmBase64(arm);
        setTattooBase64(tattoo);
      } catch (e) {
        console.error("asset->base64 failed", e);
      }
    })();
  }, []);

  const mutation = useMutation({
    mutationFn: async () =>
      textAndImageToImage({
        // prompt could be provided on the server 🤔 but it's always good to allow users to specify any additional instructions
        prompt: MIX_TOW_PHOTHOS_PROMPT,
        images_base64: [armBase64 ?? "", tattooBase64 ?? ""],
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

  const canGenerate = armBase64 && tattooBase64;

  return (
    <>
      <Text numberOfLines={3}>{MIX_TOW_PHOTHOS_PROMPT}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={require(`@/assets${bodyPartImage}`)}
          style={{ width: "50%", height: 200, borderRadius: 8 }}
          contentFit="cover"
          transition={200}
        />
        <Image
          source={require(`@/assets${tattooImage}`)}
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
        disabled={mutation.isPending || !canGenerate}
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
