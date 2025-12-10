import { tattooCategories, TattooCategory } from "@/lib/celebrity-tattoos";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { getMoodById, Mood } from "@/lib/moods";
import { NotFound } from "@/src/components/screens/notFound";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function LearnMore() {
  const { style } = useLocalSearchParams<{ style: string }>();

  // First search in moods, then tattooCategories, then in featuredTattoos
  const selectedMood: Mood | undefined = getMoodById(
    parseInt(style || "0", 10)
  );

  const selectedCategory: TattooCategory | undefined = tattooCategories.find(
    (category) => category.id.toString() === style
  );

  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === style
  );

  // Use mood if found, then category, otherwise use featured tattoo
  const currentStyle = selectedMood || selectedCategory || selectedStyle;

  const router = useRouter();

  if (!currentStyle) {
    return <NotFound />;
  }

  return (
    <>
      <Stack.Screen options={{ title: currentStyle.title }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        <Text type="default">{currentStyle.description}</Text>

        <Button
          title="Create Tattoo"
          variant="solid"
          color="white"
          onPress={() =>
            router.dismissTo({
              pathname: "/(playground)",
            })
          }
        />
        <Button
          title="Back"
          onPress={() => router.back()}
          variant="link"
          color="white"
        />
      </ScrollView>
    </>
  );
}
