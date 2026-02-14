import { Text as UIText } from "@/src/components/ui/Text";
import { Button, ContextMenu, Host, Image } from "@expo/ui/swift-ui";
import { fixedSize, frame, padding } from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { Platform, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { PressableScale } from "pressto";

type FilterMode = "body part" | "styles";

interface FilterContextMenuProps {
  filterMode: FilterMode;
  onFilterModeChange: (mode: FilterMode) => void;
  onBodyPartReset: () => void;
}

export function FilterContextMenu({
  filterMode,
  onFilterModeChange,
  onBodyPartReset,
}: FilterContextMenuProps) {
  const { t } = useTranslation();

  if (Platform.OS !== "ios") {
    // Fallback for non-iOS platforms - use a simple PressableScale
    return (
      <PressableScale
        onPress={() => {
          // Toggle between modes for non-iOS
          onFilterModeChange(
            filterMode === "body part" ? "styles" : "body part"
          );
          onBodyPartReset();
        }}
      >
        <UIText type="default" style={styles.contextMenuTrigger}>
          {filterMode === "styles" ? t('explore.styles') : t('explore.bodyPart')} ▼
        </UIText>
      </PressableScale>
    );
  }

  return (
    <Host
      matchContents
      style={{
        paddingRight: 8,
      }}
    >
      <ContextMenu>
        <ContextMenu.Items>
          <Button
            systemImage="figure.arms.open"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onFilterModeChange("body part");
              onBodyPartReset();
            }}
          >
            {t('explore.bodyPart')}
          </Button>
          <Button
            systemImage="paintbrush.fill"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onFilterModeChange("styles");
              onBodyPartReset();
            }}
          >
            {t('explore.styles')}
          </Button>
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <Button variant="glass">
            <Image
              systemName="ellipsis"
              size={26}
              modifiers={[
                padding({ vertical: 4, horizontal: 4 }),
                fixedSize(),
                frame({ height: 32, width: 32 }),
              ]}
            />
          </Button>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}

const styles = StyleSheet.create({
  contextMenuTrigger: {
    color: "#007AFF",
    fontSize: 14,
  },
});
