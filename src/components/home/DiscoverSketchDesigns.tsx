import { sketchDesigns } from "@/lib/sketch-design";
import { SketchDesignCard } from "@/src/components/ui/SketchDesignCard";
import { Text } from "@/src/components/ui/Text";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

export function DiscoverSketchDesigns() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text type="subtitle" weight="bold" style={{ paddingHorizontal: 16 }}>
        {t('home.discoverSketches')}
      </Text>
      <LegendList
        horizontal
        data={sketchDesigns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: design }) => (
          <SketchDesignCard
            design={design}
            subtitle={design.title}
            imageStyle={{
              width: 160,
            }}
            onPress={() => {
              customEvent("sketch_design_selected", {
                designId: design.id,
                designName: design.title,
                section: "discover_sketch_designs",
              });
              router.push({
                pathname: "/(tabs)/(home)/about/sketch-designs",
                params: {
                  design: design.id.toString(),
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
