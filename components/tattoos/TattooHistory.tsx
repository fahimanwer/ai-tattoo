import { useTattooHistory } from "@/context/TattooHistoryContext";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "../ui/Text";
import { TattooCard } from "./TattooCard";

interface TattooHistoryProps {
  onTattooPress?: (tattoo: any) => void;
}

export function TattooHistory({ onTattooPress }: TattooHistoryProps) {
  const { tattoos } = useTattooHistory();

  const handleTattooPress = (tattoo: any) => {
    if (onTattooPress) {
      onTattooPress(tattoo);
    } else {
      // Default behavior: navigate to detail screen
      router.push(`/(tabs)/tattoos/${tattoo.id}`);
    }
  };

  if (tattoos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          No tattoos generated yet
        </Text>
        <Text type="sm" style={styles.emptyDescription}>
          Start creating your first tattoo design!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text type="xl" weight="bold" style={styles.title}>
        Your Tattoos
      </Text>
      <Text type="sm" style={styles.subtitle}>
        {tattoos.length} generated design{tattoos.length !== 1 ? "s" : ""}
      </Text>

      <FlatList
        data={tattoos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TattooCard tattoo={item} onPress={() => handleTattooPress(item)} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: "#666",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    color: "#666",
    textAlign: "center",
  },
});
