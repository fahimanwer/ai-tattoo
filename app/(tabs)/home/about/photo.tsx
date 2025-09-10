import { NotFound } from "@/components/screens/notFound";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Photo() {
  const params = useLocalSearchParams<{
    imageUrl: string;
  }>();

  console.log("Image URL:", params.imageUrl);

  if (!params.imageUrl) {
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
          source={{ uri: params.imageUrl }}
          placeholder={{ blurhash }}
          transition={1000}
          style={{ width: "100%", height: 420 }}
          contentFit="contain"
        />
      </ScrollView>
    </>
  );
}
