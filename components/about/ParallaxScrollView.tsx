import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { Image } from "expo-image";
import type { PropsWithChildren } from "react";
import { ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const HEADER_HEIGHT = 420;

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ParallaxScrollView({
  children,
  imageUrl,
  title,
  shortDescription,
  onReadMore,
}: PropsWithChildren<{
  imageUrl: ImageSourcePropType;
  title: string;
  shortDescription: string;
  onReadMore?: () => void;
}>) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Only apply parallax effect when pulling down (negative scroll offset)
    // When scrolling up (positive offset), behave like normal scroll item
    const translateY =
      scrollOffset.value <= 0
        ? interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0],
            [-HEADER_HEIGHT / 2, 0]
          )
        : 0; // No transform when scrolling up - let natural scroll handle it

    const scale =
      scrollOffset.value <= 0
        ? interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0], [2, 1])
        : 1; // No scaling when scrolling up

    return {
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image
            source={imageUrl}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={{
              width: "100%",
              height: HEADER_HEIGHT,
            }}
          />
        </Animated.View>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text type="4xl" weight="bold">
              {title}
            </Text>
            <Text type="default" weight="normal" style={{ opacity: 0.7 }}>
              {shortDescription}
            </Text>
            {onReadMore && (
              <Pressable onPress={onReadMore} hitSlop={8}>
                <Text type="default" weight="bold" style={styles.readMoreText}>
                  Read More
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: Color.grayscale[50],
    position: "relative",
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    position: "relative",
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    height: HEADER_HEIGHT,
    backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  headerContent: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 16,
  },
  readMoreText: {
    textDecorationLine: "underline",
    opacity: 0.9,
  },
});
