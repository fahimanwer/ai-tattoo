import { Color } from "@/constants/TWPalette";
import { useSubscription } from "@/hooks/useSubscription";
import { ApiError } from "@/lib/api-client";
import { textToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { theme } from "@/theme/theme";
import { frame } from "@expo/ui/swift-ui/modifiers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button } from "./ui/Button";
import { HeaderButton } from "./ui/HeaderButtons/HeaderButton";
import { Text } from "./ui/Text";

const prompts = [
  "A neotraditional tattoo design of a roaring tiger's head with a floral headdress. The design should be in vibrant colors, with solid fills and soft gradients. The composition is dynamic and adapted for the shoulder. Technical features include ultra high resolution, clean and crisp lines, intricate details, and a . Ideal to be a professional tattoo stencil.",

  "A realistic tattoo design of a majestic owl perched on a crescent moon surrounded by peonies. The colors are deep purples, blues, and gold accents, with smooth shading and strong outlines. The design should be perfectly balanced for an upper back placement, with intricate feather texture and glowing eyes.  and ultra-high-resolution output.",
  "A neotraditional tattoo of a fierce samurai mask entwined with red chrysanthemums and smoke waves. The color palette combines crimson, black, and muted gold, with bold lines and subtle gradients. Designed for a forearm placement, featuring intricate armor details, clean composition, and a  ready for professional stencil use.",

  "A realistic tattoo design of a snake coiled around a dagger, surrounded by roses and thorns. The style should mix vibrant reds and greens with sharp contrasts and precise linework. The composition flows diagonally, suitable for a calf tattoo, with ultra-high resolution, detailed textures, and a  for stencil preparation.",

  "A realistic tattoo of a roaring bear wearing a crown of maple leaves and acorns. The color scheme should blend autumn tones—warm oranges, browns, and golds—with dynamic shading. The design is intended for the chest, featuring bold outlines, realistic fur textures, and clear separation of elements. Deliver in high resolution with .",

  "A realistic tattoo design of a heart-shaped locket wrapped in a snake and framed by black roses. The palette should combine metallic silvers, muted greens, and deep blacks, with rich gradients and precise details. The composition fits a thigh placement and should include clean lines, symmetrical balance, and  optimized for stencil work.",
];

export function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { refreshSubscriptionStatus } = useSubscription();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      if (prompt.length === 0) {
        Alert.alert("Please enter a prompt");
        return;
      }
      return textToImage({
        prompt: prompt,
      });
    },
    onSuccess: async (data) => {
      if (data?.imageData) {
        setGeneratedImage(`data:image/png;base64,${data.imageData}`);

        // Save to local tattoo history
        handleSaveToLibrary();

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

  const handleSaveToLibrary = useCallback(async () => {
    if (mutation.data?.imageData) {
      try {
        const imageUri = `data:image/png;base64,${mutation.data.imageData}`;
        await saveBase64ToAlbum(imageUri, "png");

        Alert.alert(
          "Saved!",
          "Your tattoo design has been saved to your photo gallery.",
          [
            {
              text: "View in gallery",
              style: "default",
              onPress: () => {
                router.replace("/(tabs)/tattoos");
              },
            },
            { text: "Back", style: "cancel" },
          ]
        );
      } catch (error) {
        Alert.alert("Error", "Unable to save image. Please try again.");
        console.error("Error saving to library:", error);
      }
    }
  }, [mutation.data, router]);

  const iconSize = theme.fontSize20;

  return (
    <View style={styles.textToImageContainer}>
      {mutation.isError && (
        <View
          style={{
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: Color.red[500],
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {mutation.error?.message?.startsWith("Validation Error:")
              ? "❌ Invalid Request"
              : "⚠️ Generation Failed"}
          </Text>
          <Text style={{ color: Color.red[500], fontSize: 14 }}>
            {mutation.error?.message === "LIMIT_REACHED"
              ? "You have reached your generation limit for the current period. Please upgrade your plan or wait for the next period."
              : "Failed to generate image"}
          </Text>

          <Button
            title="Upgrade Plan"
            variant="link"
            color={"blue"}
            onPress={() => {
              mutation.reset();
              router.push("/(paywall)");
            }}
          />
        </View>
      )}

      {generatedImage && (
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: generatedImage }}
            style={{ width: 300, height: 300, borderRadius: 8 }}
            contentFit="contain"
            transition={200}
          />
        </View>
      )}
      {mutation.isSuccess && generatedImage && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Button
            symbol="arrow.counterclockwise"
            variant="link"
            color="white"
            onPress={() => {
              setGeneratedImage(null);
              setPrompt("");
            }}
            title="Start over"
            disabled={mutation.isPending}
            style={{ flexShrink: 1 }}
          />
          <Button
            symbol="square.and.arrow.down"
            variant="solid"
            color="white"
            onPress={saveToLibrary}
            title="Save"
            disabled={mutation.isPending}
            style={{ flexShrink: 1 }}
          />
        </View>
      )}

      {mutation.isPending ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: 80,
          }}
        >
          <ActivityIndicator />
          <Text style={{ marginTop: 10 }}>Generating...</Text>
        </View>
      ) : (
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="Enter a prompt"
          value={prompt}
          onChangeText={setPrompt}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          <HeaderButton
            imageProps={{
              systemName: "paperclip",
              size: iconSize,
              color: "white",
            }}
            buttonProps={{
              onPress: () => router.push("/(new)/select-body-part"),
            }}
          />
          <HeaderButton
            imageProps={{
              systemName: "sparkles",
              size: iconSize,
              color: "white",
            }}
            buttonProps={{
              onPress: () => {
                setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
              },
            }}
          />
          <HeaderButton
            imageProps={{
              systemName: "arrow.counterclockwise",
              size: iconSize,
              color: "white",
            }}
            buttonProps={{
              disabled: prompt.length === 0 && !generatedImage,
              onPress: () => {
                setGeneratedImage(null);
                setPrompt("");
              },
            }}
          />
        </View>

        <HeaderButton
          imageProps={{
            systemName: "arrow.up",
            color: "primary",
          }}
          buttonProps={{
            variant: "glassProminent",
            modifiers: [frame({ height: 50 })],
            disabled: mutation.isPending || !prompt,
            onPress: () => {
              mutation.mutate(prompt.trim());
              setGeneratedImage(null);
              setPrompt("");
              Keyboard.dismiss();
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textToImageContainer: {
    gap: 16,
    borderWidth: 1,
    borderColor: Color.grayscale[200],
    borderRadius: 16,
    padding: theme.space8,
    backgroundColor: Color.grayscale[100],
  },
  textInput: {
    minHeight: 80,
    borderRadius: 8,
    padding: 8,
    backgroundColor: Color.grayscale[100],
    fontSize: theme.fontSize18,
    color: Color.grayscale[950],
  },
});
