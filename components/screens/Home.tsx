import { BodyPartsInspiration } from "@/components/home/BodyPartsInspiration";
import { GetInspiration } from "@/components/home/GetInspiration";
import { Banner } from "@/components/pro/Banner";
import { useUserData } from "@/hooks/useUserData";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export function Home() {
  const { isLoading, refresh } = useUserData();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refresh}
          tintColor="#007AFF"
        />
      }
    >
      <View style={styles.section}>
        <Banner />
        <GetInspiration />
        <BodyPartsInspiration />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 52,
    gap: 24,
  },
  myTattoosSection: {
    marginTop: 8,
  },
  myTattoosButton: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  myTattoosContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  myTattoosInfo: {
    flex: 1,
  },
  myTattoosTitle: {
    color: "white",
    marginBottom: 4,
  },
  myTattoosSubtitle: {
    color: "#666",
  },
  chevronIcon: {
    width: 16,
    height: 16,
  },
});
