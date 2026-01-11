import { AppSettingsContext } from "@/src/context/AppSettings";
import {
  Button,
  ContextMenu,
  Host,
  Image,
  Section,
  Switch,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  menuActionDismissBehavior,
} from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { use, useCallback } from "react";
import { Alert } from "react-native";

export function SettingsMenu() {
  const { settings, updateSettingsSync } = use(AppSettingsContext);
  const { blackAndWhiteMode, improvePrompt } = settings;

  const handleBlackAndWhiteModeToggle = useCallback(
    (value: boolean) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateSettingsSync({ blackAndWhiteMode: value });
    },
    [updateSettingsSync]
  );

  const handleImprovePromptToggle = useCallback(
    (value: boolean) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateSettingsSync({ improvePrompt: value });
      if (!value) {
        Alert.alert(
          "Prompt Enhancement Disabled",
          "Prompt enhancement helps generate better tattoo designs. Turning it off gives you full control, but results may vary.\n\nYou can re-enable it anytime.",
          [
            {
              text: "Enable Prompt Enhancement",
              onPress: () => handleImprovePromptToggle(true),
              isPreferred: true,
            },
            { text: "Continue Wihtout Enhancement", style: "cancel" },
          ]
        );
      }
    },
    [updateSettingsSync]
  );

  return (
    <Host matchContents useViewportSizeMeasurement>
      <ContextMenu
        activationMethod="singlePress"
        modifiers={[menuActionDismissBehavior("disabled")]}
      >
        <ContextMenu.Items>
          <Section title="Generation Settings">
            <Switch
              value={blackAndWhiteMode}
              label="Black & White Mode"
              variant="button"
              onValueChange={handleBlackAndWhiteModeToggle}
            />

            <Switch
              value={improvePrompt}
              label="Improve Prompt"
              variant="button"
              onValueChange={handleImprovePromptToggle}
            />
          </Section>
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <Button modifiers={[buttonStyle("plain")]}>
            <Image systemName="slider.horizontal.3" size={20} />
          </Button>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}
