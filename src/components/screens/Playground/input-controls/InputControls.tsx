import { cacheImageFromUrl } from "@/lib/image-cache";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import {
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Button, Surface, useThemeColor } from "heroui-native";
import { PlaygroundSuggestions } from "../shared/suggestions/PlaygroundSuggestions";
import { InputControlsProps } from "./inputContols.types";

export function InputControls({
  onChangeText,
  onSubmit,
  autoFocus,
  isSubmitDisabled = false,
  prompt = "",
  isSheetDisabled = false,
}: InputControlsProps) {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { inputControlsRef, addImagesToSession, activeGenerationUris } =
    use(PlaygroundContext);
  const { isLimitReached, subscriptionTier } = useUsageLimit();
  const isFreeTier = subscriptionTier === "free";
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground") as string;
  const muted = useThemeColor("muted") as string;

  const textInputRef = useRef<TextInput>(null);

  const shouldShowSuggestions =
    prompt.length === 0 && activeGenerationUris.length === 0;

  // Register with context so focusInput/blurInput/setText work from anywhere
  useImperativeHandle(inputControlsRef, () => ({
    focus: () => textInputRef.current?.focus(),
    blur: () => textInputRef.current?.blur(),
    setText: () => {
      // No-op for controlled input — state updates via onChangeText propagate automatically
    },
  }));

  // Refocus tracking - backup in case 800ms delay isn't enough
  const focusAttempts = useRef(0);
  const needsRefocus = useRef(false);

  useEffect(() => {
    const willShow = Keyboard.addListener("keyboardDidShow", () => {
      needsRefocus.current = false;
    });
    const didHide = Keyboard.addListener("keyboardDidHide", () => {
      if (needsRefocus.current) {
        needsRefocus.current = false;
        focusAttempts.current++;
        setTimeout(() => textInputRef.current?.focus(), 50);
      }
    });
    return () => {
      willShow.remove();
      didHide.remove();
    };
  }, [autoFocus]);

  // Focus the input after navigation transition completes
  useFocusEffect(
    useCallback(() => {
      if (!autoFocus) return;
      focusAttempts.current = 0;
      needsRefocus.current = false;
      const timer = setTimeout(() => textInputRef.current?.focus(), 800);
      return () => clearTimeout(timer);
    }, [autoFocus])
  );

  function handleSubmit() {
    if (isLimitReached && isFreeTier) {
      textInputRef.current?.blur();
      router.push("/(paywall)?variant=discount");
      return;
    }
    onSubmit?.();
    textInputRef.current?.blur();
  }

  async function handleTryOnSelect(styleName: string, imageUri: string) {
    if (isLimitReached && isFreeTier) {
      textInputRef.current?.blur();
      router.push("/(paywall)?variant=discount");
      return;
    }
    try {
      const cachedUri = await cacheImageFromUrl(imageUri);
      addImagesToSession([cachedUri]);
      Alert.alert(
        t("playground.tryOnTitle", { style: styleName }),
        t("playground.tryOnMessage"),
        [
          {
            text: t("playground.choosePhoto"),
            style: "default",
            onPress: () => {
              textInputRef.current?.blur();
              router.push("/(playground)/sheet");
            },
            isPreferred: true,
          },
          { text: t("playground.later"), style: "cancel" },
        ]
      );
    } catch (error) {
      console.error("Failed to load try-on image:", error);
    }
  }

  return (
    <KeyboardStickyView
      style={{
        position: "absolute",
        bottom: bottom,
        left: 0,
        right: 0,
      }}
      offset={{ opened: bottom - 16, closed: 0 }}
    >
      <PlaygroundSuggestions
        style={{ marginBottom: 16 }}
        visible={shouldShowSuggestions}
        onSelectText={(suggestionPrompt) => {
          onChangeText?.(suggestionPrompt);
          textInputRef.current?.focus();
        }}
        onSelectTryOn={handleTryOnSelect}
      />
      <View style={styles.paddingH}>
        <Surface
          className="rounded-3xl"
          style={[
            styles.inputContainer,
            { borderColor: isDark ? "#27272a" : "#e4e4e7" },
          ]}
        >
          <View style={styles.inputRow}>
            {/* Plus button — opens the sheet */}
            <Button
              variant="secondary"
              isIconOnly
              onPress={() => {
                textInputRef.current?.blur();
                router.push("/(playground)/sheet");
              }}
              isDisabled={isSheetDisabled}
              style={styles.circleButton}
            >
              <Ionicons name="add" size={22} color={foreground} />
            </Button>

            {/* Text input area with history button */}
            <View style={styles.textAreaWrap}>
              <View
                style={[
                  styles.textAreaInner,
                  { backgroundColor: isDark ? "#27272a" : "#f4f4f5" },
                ]}
              >
                <TextInput
                  ref={textInputRef}
                  placeholder={t("playground.enterText")}
                  placeholderTextColor={muted}
                  value={prompt}
                  onChangeText={onChangeText}
                  onSubmitEditing={handleSubmit}
                  multiline
                  style={[styles.textInput, { color: foreground }]}
                  textAlignVertical="top"
                  maxLength={500}
                />
                <Pressable
                  onPress={() => {
                    textInputRef.current?.blur();
                    router.push("/(playground)/prompt-history");
                  }}
                  hitSlop={8}
                  style={styles.historyBtn}
                >
                  <Ionicons name="time-outline" size={16} color={muted} />
                </Pressable>
              </View>
            </View>

            {/* Submit button */}
            <Button
              variant="primary"
              isIconOnly
              onPress={handleSubmit}
              isDisabled={isSubmitDisabled || prompt.length === 0}
              style={styles.circleButton}
            >
              <Ionicons name="arrow-up" size={18} color="white" />
            </Button>
          </View>
        </Surface>
      </View>
    </KeyboardStickyView>
  );
}

const styles = StyleSheet.create({
  paddingH: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    borderWidth: 1,
    padding: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  circleButton: {
    borderRadius: 999,
    width: 40,
    height: 40,
  },
  textAreaWrap: {
    flex: 1,
  },
  textAreaInner: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    minHeight: 20,
    maxHeight: 120,
    fontSize: 15,
    padding: 0,
  },
  historyBtn: {
    paddingLeft: 8,
    paddingBottom: 2,
  },
});
