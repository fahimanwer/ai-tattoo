/**
 * FlowPicker -- iOS shell with Liquid Glass support.
 */

import { Text } from "@/src/components/ui/Text";
import { FLOW_DEFINITIONS } from "@/src/constants/flow-definitions";
import { useTheme } from "@/src/context/ThemeContext";
import { FlowCard } from "@/src/components/home/FlowCard";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

export function FlowPicker() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

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
          unstable_headerLeftItems: () => [
            {
              type: "button",
              variant: "plain",
              label: t("common.close"),
              icon: { name: "xmark", type: "sfSymbol" },
              onPress: dismissToHome,
            },
          ],
        }}
      />
      <ScrollView
        style={styles.container}
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
