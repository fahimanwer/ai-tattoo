import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { Image } from "expo-image";
import { router } from "expo-router";
import { PressableScale } from "pressto";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

type QuickActionType =
  | "generate_from_idea"
  | "see_on_skin"
  | "blend_tattoo"
  | "remove_tattoo";

type QuickActionDef = {
  titleKey: string;
  descriptionKey: string;
  image: { uri: string };
  actionType: QuickActionType;
  action: () => void;
};

const actionDefs: QuickActionDef[] = [
  {
    titleKey: "home.generateFromIdea",
    descriptionKey: "home.generateFromIdeaDesc",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/1-generate-idea.avif",
    },
    actionType: "generate_from_idea",
    action: () => {
      router.push("/(playground)");
    },
  },
  {
    titleKey: "home.seeItOnSkin",
    descriptionKey: "home.seeItOnSkinDesc",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/2-see-skin.avif",
    },
    actionType: "see_on_skin",
    action: () => {
      router.push("/(playground)?mode=preview");
    },
  },
  {
    titleKey: "home.blendTattoo",
    descriptionKey: "home.blendTattooDesc",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/3-edit-tattoo.avif",
    },
    actionType: "blend_tattoo",
    action: () => {
      router.push("/(playground)?mode=edit");
    },
  },
  {
    titleKey: "home.removeTattoo",
    descriptionKey: "home.removeTattooDesc",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/4-remove.avif",
    },
    actionType: "remove_tattoo",
    action: () => {
      router.push("/(playground)?mode=remove");
    },
  },
];

function Item({ item, title, description }: { item: QuickActionDef; title: string; description: string }) {
  const { isDark } = useTheme();
  return (
    <View
      style={[
        styles.item,
        { borderColor: isDark ? Color.zinc[900] : Color.zinc[200] },
      ]}
    >
      <Image source={item.image} style={styles.image} contentFit="cover" />
      <View style={styles.textContainer}>
        <Text weight="bold" style={{ color: "white" }}>
          {title}
        </Text>
        <Text type="caption" style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

export function QuickActions() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {actionDefs.map((action, index) => (
          <PressableScale
            key={index}
            onPress={() => {
              customEvent("quick_action_pressed", {
                action: action.actionType,
              });
              action.action();
            }}
          >
            <Item item={action} title={t(action.titleKey)} description={t(action.descriptionKey)} />
          </PressableScale>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: "relative",
    width: 260,
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    borderWidth: 1,
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
