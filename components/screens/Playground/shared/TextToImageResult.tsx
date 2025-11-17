import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { ImageGenerationMutation } from "@/context/PlaygroundContext";
import { BLURHASH } from "@/lib/image-cache";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AnimatedText } from "./AnimatedText";

interface TextToImageResultProps {
  mutation: ImageGenerationMutation;
  lastGenerationUri?: string; // Now accepts file URI instead of base64
}

export function TextToImageResult({
  mutation,
  lastGenerationUri,
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
  }, [setIsKeyboardVisible]);

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

        {mutation.error?.message === "LIMIT_REACHED" ? (
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
        ) : (
          <PressableScale
            onPress={() => {
              mutation.reset();
            }}
          >
            <Text type="default" style={{ color: Color.yellow[400] }}>
              Try Again
            </Text>
          </PressableScale>
        )}
      </View>
    );
  }
  if (mutation.isPending) {
    return <LoadingChangingText lastGenerationUri={lastGenerationUri} />;
  }
  return lastGenerationUri ? (
    <Animated.View
      style={{
        flex: 1,
        paddingHorizontal: 16,
      }}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
    >
      <Image
        source={{ uri: lastGenerationUri }}
        placeholder={{ blurhash: BLURHASH }}
        cachePolicy="memory-disk"
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
    </Animated.View>
  ) : (
    <AnimatedText
      style={{ flex: 0.3 }}
      text="Describe your tattoo or choose a suggestion below"
      color={isKeyboardVisible ? Color.pink[400] : Color.zinc[400]}
      colorDark={isKeyboardVisible ? Color.purple[700] : Color.zinc[700]}
    />
  );
}

function LoadingChangingText({
  lastGenerationUri,
}: {
  lastGenerationUri?: string;
}) {
  const firstMessage = lastGenerationUri
    ? "Updating your tattoo..."
    : "Starting new tattoo...";
  const messages = [
    firstMessage,
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
    const showDuration = 2000; // how long the text stays visible
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

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      {lastGenerationUri && (
        <Image
          source={{ uri: lastGenerationUri }}
          placeholder={{ blurhash: BLURHASH }}
          cachePolicy="memory-disk"
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
          }}
          contentFit="cover"
          contentPosition="center"
          transition={350}
        />
      )}
      {visible && (
        <AnimatedText
          key={index}
          style={{ flex: lastGenerationUri ? 0.2 : 0.5 }}
          text={messages[index]}
        />
      )}
    </View>
  );
}
