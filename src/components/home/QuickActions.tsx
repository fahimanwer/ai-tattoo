import { Text } from "@/src/components/ui/Text";
import { Image } from "expo-image";
import { router } from "expo-router";
import { PressableScale } from "pressto";
import { ScrollView, StyleSheet, View } from "react-native";

const actions = [
  {
    title: "Generate from Idea",
    description: "Create a tattoo from your imagination",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/1-generate-idea.avif",
    },
    action: () => {
      router.push("/(playground)");
    },
  },
  {
    title: "See It On Your Skin",
    description: "Take a photo and preview the tattoo",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/2-see-skin.avif",
    },
    action: () => {
      router.push("/(playground)?mode=preview");
    },
  },
  {
    title: "Edit / Blend Tattoo",
    description: "Upload an existing tattoo and modify it",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/3-edit-tattoo.avif",
    },
    action: () => {
      router.push("/(playground)?mode=edit");
    },
  },
];

function Item({ item }: { item: (typeof actions)[0] }) {
  return (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} contentFit="cover" />
      <View style={styles.textContainer}>
        <Text weight="bold">{item.title}</Text>
        <Text type="caption" style={styles.description}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export function QuickActions() {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {actions.map((action, index) => (
          <PressableScale key={index} onPress={action.action}>
            <Item item={action} />
          </PressableScale>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: "relative",
    width: 300,
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 0,
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    bottom: 0,
    experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 70%, #000000 100%)`,
  },
  description: {
    color: "white",
    opacity: 0.7,
  },
});
