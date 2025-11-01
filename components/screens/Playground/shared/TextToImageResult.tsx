import { Text } from "@/components/ui/Text";
import { blurhash } from "@/components/ui/VerticalCard";
import { Color } from "@/constants/TWPalette";
import { TextAndImageToImageResponse, TextToImageResponse } from "@/lib/nano";
import { UseMutationResult } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { AnimatedText } from "./AnimatedText";

// Union type that accepts either mutation type
type ImageGenerationMutation =
  | UseMutationResult<TextToImageResponse | undefined, Error, string, unknown>
  | UseMutationResult<
      TextAndImageToImageResponse | undefined,
      Error,
      any,
      unknown
    >;

interface TextToImageResultProps {
  mutation: ImageGenerationMutation;
  lastGenerationBase64?: string;
}

export function TextToImageResult({
  mutation,
  lastGenerationBase64,
}: TextToImageResultProps) {
  const router = useRouter();

  if (mutation.isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text style={{ color: Color.red[500] }}>
          {mutation.error?.message === "LIMIT_REACHED"
            ? "You have reached your generation limit for the current period. Please upgrade your plan or wait for the next period."
            : "Something went wrong: " + mutation.error?.message ||
              "Unknown error"}
        </Text>
        <PressableScale
          onPress={() => {
            mutation.reset();
            router.dismissTo("/(tabs)/home");
          }}
        >
          <Text style={{ color: Color.blue[500] }}>Try Again Later</Text>
        </PressableScale>
        <PressableScale
          onPress={() => {
            mutation.reset();
            router.dismissTo("/profile");
          }}
        >
          <Text style={{ color: Color.blue[500] }}>Review Plan</Text>
        </PressableScale>
        {mutation.error?.message === "LIMIT_REACHED" && (
          <PressableScale
            onPress={() => {
              mutation.reset();
              router.push("/(paywall)");
            }}
          >
            <Text style={{ color: Color.yellow[500] }}>Upgrade Plan</Text>
          </PressableScale>
        )}
      </View>
    );
  }
  if (mutation.isPending) {
    return <LoadingChangingText />;
  }
  return lastGenerationBase64 ? (
    <View
      style={{
        height: 400,
        marginTop: 16,
        borderColor: "red",
      }}
    >
      <Image
        source={{ uri: lastGenerationBase64 }}
        placeholder={{ blurhash }}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
        contentFit="contain"
        transition={500}
      />
    </View>
  ) : (
    <AnimatedText text="Describe your tattoo or choose a suggestion below" />
  );
}

function LoadingChangingText() {
  const messages = [
    "Tattoo machine is warming up...",
    "Summoning the ink spirits...",
    "Drawing inspiration from the universe...",
    "Almost done brewing your masterpiece...",
    "Adding a sprinkle of creativity...",
    "Perfecting every pixel of your tattoo...",
    "Injecting creativity into your skin...",
    "Mixing the perfect shade of awesome...",
    "Sharpening virtual needles...",
    "Calibrating your tattoo vibes...",
    "Consulting the tattoo oracle...",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showDuration = 3000; // how long the text stays visible
    const transitionDuration = 1000; // matches AnimatedText exit duration

    const interval = setInterval(() => {
      setVisible(false); // trigger unmount animation

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true); // remount with new text
      }, transitionDuration);
    }, showDuration + transitionDuration);

    return () => clearInterval(interval);
  }, [messages.length]);

  return visible ? <AnimatedText key={index} text={messages[index]} /> : null;
}
