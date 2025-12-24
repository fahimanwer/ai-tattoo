import { featuredTattoos } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

export function GetInspiration() {
  const inspirationStyles = [...featuredTattoos].reverse();

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold" style={{ paddingHorizontal: 16 }}>
        Discover new styles
      </Text>
      {/* <GlassContainerDemo /> */}
      <LegendList
        horizontal
        data={inspirationStyles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: style }) => (
          <VerticalCard
            style={style}
            subtitle={style.title}
            imageStyle={{
              width: 160,
            }}
            onPress={() => {
              customEvent("style_selected", {
                styleId: style.id,
                styleName: style.title,
                section: "discover_styles",
              });
              router.push({
                pathname: "/(tabs)/(home)/about/style",
                params: {
                  style: style.id,
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
});
