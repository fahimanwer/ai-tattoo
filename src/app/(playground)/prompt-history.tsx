import {
  clearPromptHistory,
  deletePrompt,
  formatRelativeTime,
  getPromptHistory,
  type PromptHistoryEntry,
} from "@/lib/prompt-history";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { Color as NativeColor, router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import { use, useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

export default function PromptHistory() {
  const { setPrompt, focusInput } = use(PlaygroundContext);
  const [history, setHistory] =
    useState<PromptHistoryEntry[]>(getPromptHistory);

  function handleDismiss() {
    router.back();
  }

  function handleClearAll() {
    Alert.alert(
      "Clear Prompt History",
      "Are you sure you want to delete all saved prompts?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearPromptHistory();
            setHistory([]);
          },
        },
      ]
    );
  }

  function handleSelectPrompt(text: string) {
    setPrompt(text);
    router.dismiss(2);
    setTimeout(() => focusInput(), 100);
  }

  function handleDeletePrompt(id: string) {
    deletePrompt(id);
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  }

  const renderItem = useCallback(
    ({ item }: { item: PromptHistoryEntry }) => (
      <PressableScale
        style={styles.row}
        onPress={() => handleSelectPrompt(item.text)}
        onLongPress={() => {
          Alert.alert("Delete Prompt", "Remove this prompt from history?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => handleDeletePrompt(item.id),
            },
          ]);
        }}
      >
        <View style={styles.rowContent}>
          <Text numberOfLines={2} style={styles.promptText}>
            {item.text}
          </Text>
          <Text type="xs" style={styles.timestamp}>
            {formatRelativeTime(item.timestamp)}
          </Text>
        </View>
        <SymbolView
          name="chevron.right"
          size={14}
          tintColor={Color.zinc[600]}
        />
      </PressableScale>
    ),
    []
  );

  const hasHistory = history.length > 0;

  return (
    <>
      <Stack.Screen.Title>Prompt History</Stack.Screen.Title>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button onPress={handleDismiss} icon={"xmark"} />
      </Stack.Toolbar>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          tintColor={NativeColor.ios.systemRed}
          onPress={handleClearAll}
          hidden={!hasHistory}
        >
          Clear All
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      {hasHistory ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          contentInsetAdjustmentBehavior="automatic"
        />
      ) : (
        <View style={styles.emptyState}>
          <SymbolView
            name="clock.arrow.circlepath"
            size={48}
            tintColor={Color.zinc[600]}
          />
          <Text type="lg" weight="medium" style={styles.emptyTitle}>
            No prompts yet
          </Text>
          <Text type="sm" style={styles.emptySubtitle}>
            Your prompts will appear here after you generate a tattoo
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.zinc[800],
  },
  rowContent: {
    flex: 1,
    gap: 4,
  },
  promptText: {
    color: "white",
    fontSize: 15,
    lineHeight: 20,
  },
  timestamp: {
    color: Color.zinc[400],
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    color: Color.zinc[400],
    marginTop: 4,
  },
  emptySubtitle: {
    color: Color.zinc[500],
    textAlign: "center",
  },
});
