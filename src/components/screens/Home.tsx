import { onboardingEntranceHaptic } from "@/lib/haptics-patterns.ios";
import CoreHaptics from "@/modules/native-core-haptics";
import { useUserData } from "@/src/hooks/useUserData";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { CelebrityTattoos } from "../home/CelebrityTattoos";
import { DiscoverSketchDesigns } from "../home/DiscoverSketchDesigns";
import { GetInspiration } from "../home/GetInspiration";
import { Moods } from "../home/Moods";
import { QuickActions } from "../home/QuickActions";

export function Home() {
  const { refresh } = useUserData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Play entrance haptic on first mount
  useEffect(() => {
    CoreHaptics.playPattern(onboardingEntranceHaptic);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={styles.section}
        entering={FadeIn.duration(800).delay(100).springify()}
      >
        <QuickActions />
        <GetInspiration />
        <CelebrityTattoos />
        <Moods />
        <DiscoverSketchDesigns />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 12,
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
