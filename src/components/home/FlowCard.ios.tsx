/**
 * FlowCard -- iOS variant. Same image-card style as Android.
 * Photos are the visual, no Liquid Glass needed.
 */

import { Text } from "@/src/components/ui/Text";
import type { FlowDefinition } from "@/src/constants/flow-definitions";
import { useTheme } from "@/src/context/ThemeContext";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { PressableScale } from "pressto";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export type FlowCardVariant = "scroll" | "grid";

interface FlowCardProps {
  flow: FlowDefinition;
  onPress: () => void;
  variant?: FlowCardVariant;
}

export function FlowCard({ flow, onPress, variant = "grid" }: FlowCardProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const isScroll = variant === "scroll";

  return (
    <PressableScale onPress={onPress}>
      <View
        style={[
          styles.card,
          isScroll ? styles.cardScroll : styles.cardGrid,
          {
            borderColor: isDark
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.08)",
          },
        ]}
      >
        <Image
          source={flow.image}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
          recyclingKey={flow.type}
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0,0,0,0.3)",
            "rgba(0,0,0,0.8)",
            "#000000",
          ]}
          locations={[0, 0.4, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>
          <Text weight="bold" type={isScroll ? "sm" : "base"} style={styles.title}>
            {t(flow.titleKey)}
          </Text>
          <Text type="caption" style={styles.description} numberOfLines={1}>
            {t(flow.descriptionKey)}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardScroll: {
    width: 260,
    height: 140,
    marginRight: 12,
  },
  cardGrid: {
    width: "100%",
    height: 140,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 14,
    gap: 2,
  },
  title: {
    color: "#FFFFFF",
  },
  description: {
    color: "rgba(255,255,255,0.7)",
  },
});
