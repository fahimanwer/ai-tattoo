import { onboardingEntranceHaptic } from "@/lib/haptics-patterns.ios";
import CoreHaptics from "@/modules/native-core-haptics";
import { useTheme } from "@/src/context/ThemeContext";
import { useUserData } from "@/src/hooks/useUserData";
import { useThemeColor } from "heroui-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { ScreenHeader } from "../ui/ScreenHeader";
import { CelebrityTattoos } from "../home/CelebrityTattoos";
import { DiscoverSketchDesigns } from "../home/DiscoverSketchDesigns";
import { GetInspiration } from "../home/GetInspiration";
import { Moods } from "../home/Moods";
import { QuickActions } from "../home/QuickActions";

export function Home() {
  const { t } = useTranslation();
  const { refresh } = useUserData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground");
  const muted = useThemeColor("muted");

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
      <ScreenHeader title={t('navigation.appName')} />
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

// Dynamic styles that depend on theme - use these inline with isDark, foreground, muted
// myTattoosButton: backgroundColor isDark ? '#1C1C1E' : '#F2F2F7', borderColor isDark ? '#2C2C2E' : '#E5E5EA'
// myTattoosTitle: color foreground
// myTattoosSubtitle: color muted
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
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
    marginBottom: 4,
  },
  myTattoosSubtitle: {},
  chevronIcon: {
    width: 16,
    height: 16,
  },
});
