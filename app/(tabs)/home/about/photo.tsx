import { NotFound } from "@/components/screens/notFound";
import { Text } from "@/components/ui/Text";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function Photo() {
  const { style } = useLocalSearchParams<{ style: string }>();
  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === style
  );
  console.log(selectedStyle);

  if (!selectedStyle) {
    return <NotFound />;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Photo" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        <Image
          source={selectedStyle.image}
          style={{ width: "100%", height: 200 }}
          contentFit="contain"
        />
        <Text type="default">{selectedStyle.description}</Text>
      </ScrollView>
    </>
  );
}
