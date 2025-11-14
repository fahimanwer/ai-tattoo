import { NotFound } from "@/components/screens/notFound";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function LearnMore() {
  const { style } = useLocalSearchParams<{ style: string }>();
  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === style
  );

  const router = useRouter();

  if (!selectedStyle) {
    return <NotFound />;
  }

  return (
    <>
      <Stack.Screen options={{ title: selectedStyle.title }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        <Text type="default">{selectedStyle.description}</Text>

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
