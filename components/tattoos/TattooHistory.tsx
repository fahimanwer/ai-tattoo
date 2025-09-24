import { useTattooHistory } from "@/context/TattooHistoryContext";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "../ui/Text";
import { VerticalCard } from "../ui/VerticalCard";

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

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text type="lg" weight="semibold" style={styles.emptyTitle}>
        No tattoos generated yet
      </Text>
      <Text type="sm" style={styles.emptyDescription}>
        Start creating your first tattoo design!
      </Text>
    </View>
  );

  return (
    <FlatList
      data={tattoos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VerticalCard
          style={{
            id: parseInt(item.id) || 0,
            title: item.style,
            style: item.bodyPart,
            short_description: item.isOwnData ? "Own Data" : "",
            description: "",
            gallery: [],
            prompt: item.prompt || "",
            image: { uri: `data:image/png;base64,${item.imageData}` },
          }}
          onPress={() => handleTattooPress(item)}
          title={item.style}
          subtitle={item.bodyPart}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: "#666",
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
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
    minHeight: 300,
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
