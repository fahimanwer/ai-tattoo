import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { PressableScale } from "pressto";
import { useTranslation } from "react-i18next";
import { Activity, useEffect, useState } from "react";
import { View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

const AnimatedPressableScale = Animated.createAnimatedComponent(PressableScale);

type OfferingCardProps = {
  title: string;
  package: PurchasesPackage;
  onPress?: () => void;
  isCurrentPlan?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  term: string;
  discountBadge?: string;
  trialBadge?: string;
  subtitle?: string;
  strikethroughPrice?: string;
};

const ANIMATION_DURATION = 200;

export function OfferingCard({
  title,
  package: pkg,
  onPress,
  isCurrentPlan = false,
  disabled = false,
  isSelected = false,
  term,
  discountBadge,
  trialBadge,
  subtitle,
  strikethroughPrice,
}: OfferingCardProps) {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const progress = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [isSelected, progress]);

  const handlePress = async () => {
    if (disabled || isCurrentPlan || !onPress || isPurchasing) return;

    try {
      setIsPurchasing(true);
      onPress();
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const product = pkg.product;

  const borderColors = isDark
    ? [Color.grayscale[100], "white"]
    : [Color.zinc[200], Color.zinc[900]];
  const bgColors = isDark
    ? ["black", Color.grayscale[100]]
    : ["white", Color.zinc[100]];

  const animatedCardStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(progress.value, [0, 1], borderColors),
    backgroundColor: interpolateColor(progress.value, [0, 1], bgColors),
  }));

  // Animated tint for icon - crossfade approach
  const selectedIconOpacity = useAnimatedStyle(() => ({
    opacity: progress.value,
    position: "absolute" as const,
  }));

  const unselectedIconOpacity = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  return (
    <AnimatedPressableScale
      onPress={handlePress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderRadius: 18,
          borderCurve: "continuous",
        },
        animatedCardStyle,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {/* Icon with crossfade animation */}
        <View style={{ width: 26, height: 26 }}>
          <Animated.View style={unselectedIconOpacity}>
            <Icon
              symbol="circle.fill"
              size="lg"
              color={isDark ? Color.grayscale[700] : Color.grayscale[300]}
            />
          </Animated.View>
          <Animated.View style={selectedIconOpacity}>
            <Icon symbol="checkmark.circle.fill" size="lg" color="#3563E9" />
          </Animated.View>
        </View>
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text weight="bold">{title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {strikethroughPrice && (
              <Text
                type="sm"
                style={{
                  color: Color.grayscale[400],
                  textDecorationLine: "line-through",
                }}
              >
                {strikethroughPrice}
              </Text>
            )}
            <Text
              weight="medium"
              type="base"
              style={{ color: Color.grayscale[400] }}
            >
              {product.priceString.replace(/\s/g, "")}/{term}
            </Text>
          </View>
          {subtitle && (
            <Text type="xs" style={{ color: Color.grayscale[500] }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Weekly price */}
      <Text type="sm">
        {product.pricePerWeekString?.replace(/\s/g, "")}{t('paywall.perWeek')}
      </Text>

      {/* Trial badge */}
      <Activity mode={trialBadge ? "visible" : "hidden"}>
        <View
          style={{
            position: "absolute",
            top: -8,
            right: 16,
            backgroundColor: "#f59e0b",
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 50,
          }}
        >
          <Text
            weight="bold"
            type="xs"
            style={{ color: "white", letterSpacing: 0.5 }}
          >
            {trialBadge}
          </Text>
        </View>
      </Activity>

      {/* Discount/Savings badge */}
      <Activity mode={!trialBadge && discountBadge ? "visible" : "hidden"}>
        <View
          style={{
            position: "absolute",
            top: -8,
            right: 16,
            backgroundColor: isDark ? Color.grayscale[950] : "#3563E9",
            paddingHorizontal: 8,
            borderRadius: 50,
          }}
        >
          <Text
            weight="semibold"
            type="xs"
            style={{ color: isDark ? "black" : "white" }}
          >
            {discountBadge}
          </Text>
        </View>
      </Activity>

      {/* Current plan badge */}
      <Activity mode={isCurrentPlan ? "visible" : "hidden"}>
        <View
          style={{
            position: "absolute",
            top: -8,
            right: 16,
            backgroundColor: "#3563E9",
            paddingHorizontal: 8,
            borderRadius: 30,
          }}
        >
          <Text weight="semibold" type="xs" style={{ color: "white" }}>
            {t('paywall.current')}
          </Text>
        </View>
      </Activity>
    </AnimatedPressableScale>
  );
}
