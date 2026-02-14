import {
  ControlField,
  Description,
  Label,
  PressableFeedback,
  Surface,
  useThemeColor,
} from "heroui-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Text, View } from "react-native";

export function ProfileRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
      }}
    >
      <Text style={{ color: muted, fontSize: 15 }}>{label}</Text>
      <Text style={{ color: valueColor || fg, fontSize: 15, fontWeight: "500" }}>
        {value}
      </Text>
    </View>
  );
}

export function SectionCard({
  title,
  children,
  footer,
}: {
  title?: string;
  children: React.ReactNode;
  footer?: string;
}) {
  const muted = useThemeColor("muted");

  return (
    <View style={{ gap: 6 }}>
      {title && (
        <Text
          style={{
            color: muted,
            fontSize: 13,
            fontWeight: "500",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            paddingHorizontal: 4,
          }}
        >
          {title}
        </Text>
      )}
      <Surface className="px-4 py-3">
        {children}
      </Surface>
      {footer && (
        <Text
          style={{ color: muted, fontSize: 12, paddingHorizontal: 4, marginTop: 2 }}
        >
          {footer}
        </Text>
      )}
    </View>
  );
}

export function SettingsToggleRow({
  icon,
  title,
  description,
  isSelected,
  onSelectedChange,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description?: string;
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
}) {
  const muted = useThemeColor("muted");

  return (
    <ControlField isSelected={isSelected} onSelectedChange={onSelectedChange}>
      <Ionicons name={icon} size={20} color={muted} />
      <View style={{ flex: 1 }}>
        <Label>{title}</Label>
        {description && <Description>{description}</Description>}
      </View>
      <ControlField.Indicator />
    </ControlField>
  );
}

export function ActionRow({
  title,
  icon,
  onPress,
  color,
  showChevron = true,
}: {
  title: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  color?: string;
  showChevron?: boolean;
}) {
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");

  return (
    <PressableFeedback
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
      style={{ marginHorizontal: -16 }}
    >
      <PressableFeedback.Highlight />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 13,
          paddingHorizontal: 16,
          gap: 12,
        }}
      >
        {icon && <Ionicons name={icon} size={20} color={muted} />}
        <Text style={{ color: color || fg, fontSize: 15, flex: 1 }}>{title}</Text>
        {showChevron && (
          <Ionicons name="chevron-forward" size={16} color={muted} />
        )}
      </View>
    </PressableFeedback>
  );
}
