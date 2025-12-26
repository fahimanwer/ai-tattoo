import { BLURHASH } from "@/lib/image-cache";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@/src/components/ui/Icon";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import {
  ImageGenerationMutation,
  PlaygroundContext,
} from "@/src/context/PlaygroundContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { Activity, use, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AnimatedText } from "./AnimatedText";
import { getPlaygroundErrorType, PlaygroundError } from "./PlaygroundError";

interface TextToImageResultProps {
  mutation: ImageGenerationMutation;
  lastGenerationUris: string[]; // Array of file URIs
}

export function TextToImageResult({
  mutation,
  lastGenerationUris,
}: TextToImageResultProps) {
  const router = useRouter();
  const { removeImageFromActiveGroup, handleTattooGeneration, blurInput } =
    use(PlaygroundContext);
  // Use RevenueCat as source of truth for subscription status
  const { hasActiveSubscription } = useSubscription();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const isFreeTier = !hasActiveSubscription;

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
    const errorType = getPlaygroundErrorType(
      mutation.error?.message,
      isFreeTier
    );

    return (
      <PlaygroundError
        errorType={errorType}
        errorMessage={mutation.error?.message}
        onDismiss={() => mutation.reset()}
      />
    );
  }
  if (mutation.isPending) {
    return <LoadingChangingText lastGenerationUris={lastGenerationUris} />;
  }
  return (
    <>
      <Activity mode={lastGenerationUris.length > 0 ? "visible" : "hidden"}>
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            gap: 12,
          }}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {lastGenerationUris.map((uri, index) => (
              <View
                key={uri}
                style={{
                  position: "relative",
                  width: lastGenerationUris.length === 1 ? "100%" : "48%",
                }}
              >
                <PressableScale
                  onPress={() => {
                    blurInput();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push({
                      pathname: "/(playground)/playground-preview",
                      params: { imageUri: uri },
                    });
                  }}
                  animationType="timing"
                >
                  <Image
                    source={{ uri }}
                    placeholder={{ blurhash: BLURHASH }}
                    cachePolicy="memory-disk"
                    style={{
                      width: "100%",
                      height: lastGenerationUris.length === 1 ? 400 : 200,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: Color.gray[500] + "30",
                    }}
                    contentFit="cover"
                    contentPosition="center"
                    transition={350}
                  />
                </PressableScale>
                <Pressable
                  onPress={() => {
                    blurInput();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    removeImageFromActiveGroup(uri);
                  }}
                  hitSlop={8}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: "black",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <Icon symbol="xmark" size="xs" color="white" />
                </Pressable>
              </View>
            ))}
          </View>
          <Activity
            mode={lastGenerationUris.length === 2 ? "visible" : "hidden"}
          >
            <Button
              title="Apply Tattoo"
              color="yellow"
              variant="solid"
              radius="full"
              onPress={handleTattooGeneration}
              haptic
              style={{ zIndex: 100 }}
            />
            <Text
              type="xs"
              weight="medium"
              style={{ color: Color.zinc[400], textAlign: "center" }}
            >
              Select one tattoo image and one body part photo.
            </Text>
          </Activity>

          <Activity mode={lastGenerationUris.length > 0 ? "visible" : "hidden"}>
            <Text
              type="xs"
              weight="medium"
              style={{ color: Color.zinc[400], textAlign: "center" }}
            >
              {lastGenerationUris.length === 1
                ? "1 image selected - add one more to combine"
                : `${lastGenerationUris.length} images selected (max)`}
            </Text>
            <Text
              type="xs"
              weight="medium"
              style={{ color: Color.zinc[400], textAlign: "center" }}
            >
              Only currently selected images are sent to the model.
            </Text>
          </Activity>
        </Animated.View>
      </Activity>

      <Activity mode={lastGenerationUris.length === 0 ? "visible" : "hidden"}>
        <AnimatedText
          style={{ flex: 0.3 }}
          text="Describe your tattoo or choose a suggestion below"
          color={isKeyboardVisible ? Color.pink[400] : Color.zinc[400]}
          colorDark={isKeyboardVisible ? Color.purple[700] : Color.zinc[700]}
        />
      </Activity>
    </>
  );
}

function LoadingChangingText({
  lastGenerationUris,
}: {
  lastGenerationUris: string[];
}) {
  const hasImages = lastGenerationUris.length > 0;
  const firstMessage = hasImages
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
        padding: 32,
        gap: 32,
      }}
    >
      {hasImages && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          {lastGenerationUris.slice(0, 3).map((uri, index) => (
            <Image
              key={uri}
              source={{ uri }}
              placeholder={{ blurhash: BLURHASH }}
              cachePolicy="memory-disk"
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: Color.yellow[700],
                marginRight: index < 2 ? -8 : 0,
                marginLeft: index < 2 ? -8 : 0,
              }}
              contentFit="cover"
              contentPosition="center"
              transition={350}
            />
          ))}
          {lastGenerationUris.length > 3 && (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: Color.zinc[800],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: Color.zinc[400], fontSize: 20 }}>
                +{lastGenerationUris.length - 3}
              </Text>
            </View>
          )}
        </View>
      )}
      {visible && (
        <AnimatedText
          key={index}
          style={{ flex: hasImages ? 0.2 : 0.5 }}
          text={messages[index]}
        />
      )}
    </View>
  );
}
