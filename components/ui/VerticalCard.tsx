import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

interface VerticalCardProps {
  style: FeaturedTattoo;
  onPress: (style: FeaturedTattoo) => void;
  showOverlay?: boolean; // Controls visibility of title, description, and blur
}

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function VerticalCard({
  style,
  onPress,
  showOverlay = true,
}: VerticalCardProps) {
  const router = useRouter();

  return (
    <>
      <Pressable
        key={style.id}
        onPress={() => onPress(style)}
        style={({ pressed }) => [
          styles.styleContainer,
          { transform: [{ scale: pressed ? 0.99 : 1 }] },
        ]}
      >
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/home/about/photo",
              params: {
                style: style.id,
              },
            });
          }}
        >
          <Image
            source={style.image}
            style={[styles.styleImage]}
            contentFit="cover"
            contentPosition="center"
            placeholder={{ blurhash }}
            transition={1000}
          />
        </Pressable>
        {showOverlay && (
          <>
            <BlurView
              intensity={20}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                height: 70,
                width: "100%",
              }}
            />
            <View style={styles.styleImageContainer}>
              <Text type="base" weight="bold">
                {style.title}
              </Text>
              <Text
                type="sm"
                weight="normal"
                style={styles.description}
                numberOfLines={1}
              >
                {style.style}
              </Text>
            </View>
          </>
        )}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  styleContainer: {
    position: "relative",
    marginRight: 12,
    alignItems: "center",
    gap: 6,
    overflow: "hidden",
  },
  styleImage: {
    width: 160,
    height: 280,
    borderRadius: 16,
  },
  styleImageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    left: 0,
    top: 0,
    zIndex: 2,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  description: {
    width: "100%",
    opacity: 0.7,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
