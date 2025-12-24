import { moods } from "@/lib/moods";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

export function Moods() {
  const moodsData = [...moods];

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold" style={{ paddingHorizontal: 16 }}>
        Moods
      </Text>
      <LegendList
        horizontal
        data={moodsData}
        keyExtractor={(item) => `mood-${item.id.toString()}`}
        renderItem={({ item: mood }) => (
          <VerticalCard
            style={mood}
            subtitle={mood.title}
            imageStyle={{
              width: 160,
            }}
            onPress={() => {
              customEvent("mood_selected", {
                moodId: mood.id,
                moodName: mood.title,
                section: "moods",
              });
              router.push({
                pathname: "/(tabs)/(home)/about/style",
                params: {
                  style: mood.id,
                },
              });
            }}
          />
        )}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        recycleItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
});
