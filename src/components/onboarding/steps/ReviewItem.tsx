import { Color } from "@/src/constants/TWPalette";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Text } from "../../ui/Text";

export type Review = {
  stars: number;
  title: string;
  review: string;
  createdAt: Date;
  author: string;
};

const REVIEW_ANIMATION_CONFIG = {
  initialDelay: 200,
  staggerDelay: 100,
  fadeDuration: 350,
};

function formatDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

interface ReviewItemProps {
  review: Review;
  index: number;
}

export function ReviewItem({ review, index }: ReviewItemProps) {
  const enteringDelay =
    REVIEW_ANIMATION_CONFIG.initialDelay +
    index * REVIEW_ANIMATION_CONFIG.staggerDelay;

  return (
    <Animated.View
      entering={FadeIn.duration(REVIEW_ANIMATION_CONFIG.fadeDuration).delay(
        enteringDelay
      )}
      exiting={FadeOut.duration(200)}
      style={{
        borderWidth: 1,
        borderColor: Color.grayscale[100],
        borderRadius: 16,
        backgroundColor: "black",
        paddingHorizontal: 17,
        paddingVertical: 17,
        marginRight: 12,
        width: 320,
        height: 200,
      }}
    >
      {/* Header: Stars and Date */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {/* Stars */}
        <View style={{ flexDirection: "row", gap: 4 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text
              key={i}
              style={{
                color:
                  i < review.stars ? Color.yellow[400] : Color.grayscale[400],
                fontSize: 16,
              }}
            >
              ★
            </Text>
          ))}
        </View>

        {/* Date */}
        <Text style={{ color: Color.grayscale[600], fontSize: 12 }}>
          {formatDate(review.createdAt)}
        </Text>
      </View>

      {/* Title */}
      <Text weight="medium" style={{ marginBottom: 8, fontSize: 16 }}>
        {review.title}
      </Text>

      {/* Review text */}
      <Text
        style={{
          color: Color.grayscale[400],
          marginBottom: 12,
          lineHeight: 20,
          flex: 1,
        }}
        numberOfLines={4}
      >
        {review.review}
      </Text>

      {/* Author */}
      <Text style={{ color: Color.grayscale[500], fontSize: 14 }}>
        {review.author}
      </Text>
    </Animated.View>
  );
}
