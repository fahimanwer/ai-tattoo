import {
  BottomSheet,
  ControlField,
  Description,
  Label,
  PressableFeedback,
  Surface,
  useThemeColor,
} from "heroui-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/context/ThemeContext";
import type { LanguageOption } from "@/src/hooks/useLanguage";

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
    <ControlField
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      style={{ paddingVertical: 10 }}
    >
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

export function LanguagePickerModal({
  isOpen,
  onOpenChange,
  selectedLanguage,
  availableLanguages,
  autoLanguageCode,
  onSelectLanguage,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: string;
  availableLanguages: LanguageOption[];
  autoLanguageCode: string;
  onSelectLanguage: (code: string) => void;
}) {
  const { t } = useTranslation();
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");
  const { isDark } = useTheme();

  type LangItem = { code: string; nativeName: string; name: string };
  const data: LangItem[] = [
    { code: autoLanguageCode, nativeName: t('profile.languageAuto'), name: '' },
    ...availableLanguages,
  ];

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content snapPoints={["70%"]}>
          <View style={{ paddingHorizontal: 20, paddingBottom: 8 }}>
            <BottomSheet.Title>{t('profile.language')}</BottomSheet.Title>
          </View>
          <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
            {data.map((item) => {
              const isSelected = item.code === selectedLanguage;
              return (
                <Pressable
                  key={item.code}
                  onPress={() => {
                    onSelectLanguage(item.code);
                    onOpenChange(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 14,
                    borderBottomWidth: 0.5,
                    borderBottomColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  }}
                >
                  <View style={{ gap: 2 }}>
                    <Text style={{ color: fg, fontSize: 16, fontWeight: isSelected ? "600" : "400" }}>
                      {item.nativeName}
                    </Text>
                    {item.name ? (
                      <Text style={{ color: muted, fontSize: 13 }}>{item.name}</Text>
                    ) : null}
                  </View>
                  {isSelected && <Ionicons name="checkmark" size={20} color="#3563E9" />}
                </Pressable>
              );
            })}
          </BottomSheetScrollView>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
