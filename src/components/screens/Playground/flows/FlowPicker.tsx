/**
 * FlowPicker -- 2-column grid of flow cards shown when the playground opens.
 * Android / default shell.
 */

import { Text } from "@/src/components/ui/Text";
import { FLOW_DEFINITIONS } from "@/src/constants/flow-definitions";
import { useTheme } from "@/src/context/ThemeContext";
import { FlowCard } from "@/src/components/home/FlowCard";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useThemeColor } from "heroui-native";
import { customEvent } from "vexo-analytics";

export function FlowPicker() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground") as string;

  function dismissToHome() {
    if (router.canGoBack()) {
      router.dismissAll();
    } else {
      router.replace("/(tabs)/(home)");
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("flows.pickerTitle"),
          headerShadowVisible: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: isDark ? "#18181b" : "#ffffff",
          },
          headerTintColor: foreground,
          headerLeft: () => (
            <Pressable onPress={dismissToHome} hitSlop={8} style={{ padding: 4 }}>
              <Ionicons name="close" size={22} color={foreground} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#18181b" : "#ffffff" },
        ]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text type="sm" style={[styles.subtitle, { opacity: 0.6 }]}>
          {t("flows.pickerSubtitle")}
        </Text>
        <View style={styles.grid}>
          {FLOW_DEFINITIONS.map((flow) => (
            <View key={flow.type} style={styles.cell}>
              <FlowCard
                flow={flow}
                onPress={() => {
                  customEvent("flow_selected", { flow: flow.type });
                  router.push(flow.route as any);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  cell: {
    width: "47%",
    flexGrow: 1,
  },
});
