import { BLURHASH } from "@/lib/image-cache";
import { OnboardingButton } from "@/src/components/onboarding/OnboardingButton";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import {
  ImageGenerationMutation,
  PlaygroundContext,
} from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { spaceScale } from "@/src/theme/theme";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Activity, use, useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AnimatedText } from "./AnimatedText";
import { getPlaygroundErrorType, PlaygroundError } from "./PlaygroundError";
import { ResultImage } from "./ResultImage";

interface TextToImageResultProps {
  mutation: ImageGenerationMutation;
  lastGenerationUris: string[]; // Array of file URIs
}

export function TextToImageResult({
  mutation,
  lastGenerationUris,
}: TextToImageResultProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { removeImageFromActiveGroup, handleTattooGeneration, blurInput } =
    use(PlaygroundContext);
  // Use RevenueCat as source of truth for subscription status
  const { hasActiveSubscription } = useSubscription();
  const isFreeTier = !hasActiveSubscription;
  const { isDark } = useTheme();

  function simulateTattoMachineVibrations() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

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
        onDismiss={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          blurInput();
          mutation.reset();
        }}
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
            paddingTop: spaceScale(8),
            paddingHorizontal: spaceScale(16),
            gap: spaceScale(12),
          }}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {lastGenerationUris.map((uri, index) => (
              <View
                key={uri}
                style={{
                  position: "relative",
                  width: lastGenerationUris.length === 1 ? "100%" : "48%",
                  height: lastGenerationUris.length === 1 ? 400 : 200,
                }}
              >
                <ResultImage
                  uri={uri}
                  onPress={() => {
                    blurInput();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    router.push({
                      pathname: "/(playground)/playground-preview",
                      params: { imageUri: uri },
                    });
                  }}
                  isSingleImage={lastGenerationUris.length === 1}
                  onRemove={() => {
                    blurInput();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    removeImageFromActiveGroup(uri);
                  }}
                />
              </View>
            ))}
          </View>
          <Activity
            mode={lastGenerationUris.length === 2 ? "visible" : "hidden"}
          >
            <OnboardingButton
              title={t('playground.previewOnBody')}
              onPress={handleTattooGeneration}
              // controlSizeProp=""
              fullWidth={false}
              isLastStep={true}
            />
          </Activity>

          <Activity
            mode={
              lastGenerationUris.length > 0 && lastGenerationUris.length < 2
                ? "visible"
                : "hidden"
            }
          >
            <Text
              type="xs"
              weight="medium"
              style={{ color: isDark ? Color.zinc[400] : Color.zinc[500], textAlign: "center" }}
            >
              {t('playground.imageSelectedCombine')}
            </Text>
          </Activity>
        </Animated.View>
      </Activity>

      <Activity mode={lastGenerationUris.length === 0 ? "visible" : "hidden"}>
        <AnimatedText
          style={{ flex: 0.3 }}
          text={t('playground.describeTattoo')}
          color={isDark ? Color.blue[400] : "#3563E9"}
          colorDark={isDark ? Color.blue[900] : Color.blue[200]}
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
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const hasImages = lastGenerationUris.length > 0;
  const firstMessage = hasImages
    ? t('playground.loadingMessages.updatingTattoo')
    : t('playground.loadingMessages.startingNew');
  const messages = [
    firstMessage,
    t('playground.loadingMessages.warmingUp'),
    t('playground.loadingMessages.summoningSpirits'),
    t('playground.loadingMessages.drawingInspiration'),
    t('playground.loadingMessages.brewingMasterpiece'),
    t('playground.loadingMessages.sprinkleCreativity'),
    t('playground.loadingMessages.perfectingPixels'),
    t('playground.loadingMessages.injectingCreativity'),
    t('playground.loadingMessages.mixingShade'),
    t('playground.loadingMessages.sharpeningNeedles'),
    t('playground.loadingMessages.calibratingVibes'),
    t('playground.loadingMessages.consultingOracle'),
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
                backgroundColor: isDark ? Color.zinc[800] : Color.zinc[100],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: isDark ? Color.zinc[400] : Color.zinc[500], fontSize: 20 }}>
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
