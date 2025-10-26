import { theme } from "@/theme/theme";
import {
  Button,
  ContextMenu,
  Host,
  HStack,
  Image,
  Text,
} from "@expo/ui/swift-ui";
import { buttonStyle, fixedSize } from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export function HomeContextMenu() {
  const router = useRouter();

  return (
    <Host style={styles.container}>
      <ContextMenu
        modifiers={[
          buttonStyle(isLiquidGlassAvailable() ? "glass" : "bordered"),
        ]}
      >
        <ContextMenu.Items>
          <Button
            systemImage="person.crop.square"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/(new)/select-body-part");
            }}
          >
            Try On Tattoo
          </Button>
          <Button
            systemImage="apple.image.playground"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/(playground)");
            }}
          >
            Tattoo Playground
          </Button>
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <HStack modifiers={[fixedSize()]} spacing={theme.space8}>
            <Image systemName="plus" size={theme.fontSize16} color="white" />
            <Text weight="semibold" size={theme.fontSize16} color={"white"}>
              Tattoo
            </Text>
          </HStack>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 34,
    width: 94,
  },
});
