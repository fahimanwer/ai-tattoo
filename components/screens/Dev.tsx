import { authClient } from "@/lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function Dev() {
  // Access the client
  const queryClient = useQueryClient();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Queries
  // const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  // Mutations
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + "/api/nano/text-to-image",
        {
          method: "POST",
          body: JSON.stringify({ prompt: "Generate a cute dog image" }),
          headers: {
            "Content-Type": "application/json",
            Cookie: authClient.getCookie(),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Mutation failed with status ${response.status} and message ${response.statusText}`
        );
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log(
        "client",
        "mutation was successful",
        JSON.stringify(data, null, 2)
      );

      // Set the generated image data for display
      if (data.imageData) {
        setGeneratedImage(`data:image/png;base64,${data.imageData}`);
      }
    },
    onError: (error) => {
      console.error("client", "mutation failed", error);
      setGeneratedImage(null);
    },
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text>Generate a cute dog image</Text>

      <Button
        onPress={() => {
          setGeneratedImage(null);
          mutation.mutate();
        }}
        title={mutation.isPending ? "Generating..." : "Text to Image"}
        disabled={mutation.isPending}
      />

      {mutation.isPending && (
        <View style={{ alignItems: "center", padding: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Generating image...</Text>
        </View>
      )}

      {mutation.isError && (
        <View
          style={{ padding: 16, backgroundColor: "#ffebee", borderRadius: 8 }}
        >
          <Text style={{ color: "#c62828" }}>
            Error: {mutation.error?.message || "Failed to generate image"}
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
            resizeMode="contain"
          />
        </View>
      )}
    </ScrollView>
  );
}
