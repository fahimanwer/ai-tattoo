import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
/* import { BlurView } from "expo-blur";
 */
import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

interface VerticalCardProps {
  style: FeaturedTattoo;
  onPress: (style: FeaturedTattoo) => void;
  showOverlay?: boolean; // Controls visibility of title, description, and blur
  title?: string; // Override title from style object
  subtitle?: string; // Override subtitle from style object
}

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function VerticalCard({
  style,
  onPress,
  showOverlay = true,
  title,
  subtitle,
}: VerticalCardProps) {
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
        <Image
          cachePolicy="memory-disk"
          source={style.image}
          style={[styles.styleImage]}
          contentFit="cover"
          contentPosition="center"
          placeholder={{ blurhash }}
          transition={1000}
        />
        {showOverlay && (
          <>
            {/* Glass View with clear style */}
            {/* <GlassView
              style={{
                position: "absolute",
                left: "50%",
                transform: [{ translateX: "-50%" }],
                bottom: 24,
                height: 50,
                width: "95%",
                borderRadius: 16,
              }}
              glassEffectStyle="clear"
            /> */}
            {isLiquidGlassAvailable() ? (
              <GlassView
                style={styles.styleImageContainer}
                glassEffectStyle="clear"
              >
                <Text type="base" weight="bold">
                  {title || style.title}
                </Text>
                <Text
                  type="sm"
                  weight="normal"
                  style={styles.description}
                  numberOfLines={1}
                >
                  {subtitle || style.style}
                </Text>
              </GlassView>
            ) : (
              <BlurView intensity={20} style={styles.blurViewContainer}>
                <Text type="base" weight="bold">
                  {title || style.title}
                </Text>
                <Text
                  type="sm"
                  weight="normal"
                  style={styles.description}
                  numberOfLines={1}
                >
                  {subtitle || style.style}
                </Text>
              </BlurView>
            )}
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
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  styleImage: {
    width: 160,
    height: 280,
    borderRadius: 16,
  },
  styleImageContainer: {
    position: "absolute",
    width: "95%",
    height: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    bottom: 4,
    zIndex: 2,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    bottom: 0,
    zIndex: 2,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
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
