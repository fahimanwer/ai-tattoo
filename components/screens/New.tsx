import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export function New() {
  const [selectedTattoo, setSelectedTattoo] = useState<FeaturedTattoo | null>(
    null
  );
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select a tattoo
        </Text>
        <Text type="body">Select a tattoo to try on</Text>

        <ScrollView horizontal style={{ flex: 1, height: 200 }}>
          {featuredTattoos.map((tattoo) => (
            <Pressable
              key={tattoo.id}
              onPress={() => setSelectedTattoo(tattoo)}
            >
              <Image
                key={tattoo.id}
                source={tattoo.image}
                style={{
                  width: 200,
                  height: 200,
                  borderWidth: 1,
                  borderColor:
                    selectedTattoo?.id === tattoo.id ? "orange" : "transparent",
                }}
                contentFit="contain"
              />
            </Pressable>
          ))}
        </ScrollView>

        <Link href="/home/choose-photo" asChild>
          <Button
            symbol="arrow.right"
            variant="solid"
            haptic
            color="black"
            title="Continue"
            disabled={!selectedTattoo}
            onPress={() => {}}
          />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
});
