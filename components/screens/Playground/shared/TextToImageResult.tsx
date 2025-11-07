import { Text } from "@/components/ui/Text";
import { blurhash } from "@/components/ui/VerticalCard";
import { Color } from "@/constants/TWPalette";
import { TextAndImageToImageResponse, TextToImageResponse } from "@/lib/nano";
import { UseMutationResult } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  function simulateTattoMachineVibrations() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [Keyboard.addListener, setIsKeyboardVisible]);

  // Vibrate periodically while generation is pending
  useEffect(() => {
    if (!mutation.isPending) return;

    // Initial vibration when loading starts
    simulateTattoMachineVibrations();

    // Continue vibrating periodically to simulate tattoo machine
    const vibrationInterval = setInterval(() => {
      simulateTattoMachineVibrations();
    }, 2000); // Vibrate every 2 seconds

    return () => clearInterval(vibrationInterval);
  }, [mutation.isPending]);

  if (mutation.isError) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text type="sm" style={{ color: Color.red[600], textAlign: "center" }}>
          {mutation.error?.message === "LIMIT_REACHED"
            ? "You have reached your generation limit for the current period. Please upgrade your plan or wait for the next period."
            : "Something went wrong: " + mutation.error?.message ||
              "Unknown error"}
        </Text>

        {mutation.error?.message === "LIMIT_REACHED" && (
          <PressableScale
            onPress={() => {
              mutation.reset();
              router.push("/(paywall)");
            }}
          >
            <Text type="default" style={{ color: Color.yellow[400] }}>
              Upgrade Plan
            </Text>
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
        flex: 1,
        padding: 16,
      }}
    >
      <Image
        source={{ uri: lastGenerationBase64 }}
        placeholder={{ blurhash }}
        style={{
          width: "100%",
          height: 400,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: Color.gray[500] + "30",
        }}
        contentFit="cover"
        contentPosition="center"
        transition={350}
      />
    </View>
  ) : (
    <AnimatedText
      style={{ flex: 0.6 }}
      text="Describe your tattoo or choose a suggestion below"
      color={isKeyboardVisible ? Color.orange[400] : Color.zinc[400]}
      colorDark={isKeyboardVisible ? Color.orange[700] : Color.zinc[700]}
    />
  );
}

function LoadingChangingText() {
  const messages = [
    "Starting new tattoo...",
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
    const showDuration = 1500; // how long the text stays visible
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
