import { Colors } from "@/constants/Colors";
import { useAccentColor } from "@/hooks/useAccentColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  ColorConfig,
  getColorValue,
  RADIUS_VALUES,
  UIColor,
  UIRadius,
  UISize,
} from "@/types/ui";
import * as Haptics from "expo-haptics";
import { SFSymbol } from "expo-symbols";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Icon } from "./Icon";
import { Text } from "./Text";

type ButtonVariant = "solid" | "outline" | "soft" | "subtle" | "link";

const generateVariantConfig = (
  color: UIColor,
  colorScheme: "light" | "dark"
): Record<ButtonVariant, ColorConfig> => {
  const isDark = colorScheme === "dark";

  if (color === "black") {
    const bgColor = getColorValue("black", 50);
    const textColor = getColorValue("black", 950);
    const borderColor = bgColor;

    return {
      solid: {
        backgroundColor: bgColor,
        borderColor: borderColor,
        textColor: textColor,
        borderWidth: 1,
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: bgColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: bgColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: borderColor,
        textColor: bgColor,
        borderWidth: 1,
      },
      link: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: bgColor,
        borderWidth: 0,
      },
    };
  }

  if (color === "white") {
    const bgColor = getColorValue("white", 950); // Full white
    const textColor = getColorValue("white", 50); // Full black
    const borderColor = bgColor;

    return {
      solid: {
        backgroundColor: bgColor,
        borderColor: borderColor,
        textColor: textColor,
        borderWidth: 1,
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: bgColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: bgColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: borderColor,
        textColor: bgColor,
        borderWidth: 1,
      },
      link: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: bgColor,
        borderWidth: 0,
      },
    };
  }

  if (color === "neutral") {
    const bgColor = isDark
      ? getColorValue("white", 950)
      : getColorValue("black", 50);
    const textColor = isDark
      ? getColorValue("white", 50)
      : getColorValue("black", 950);
    const borderColor = bgColor;
    return {
      solid: {
        backgroundColor: bgColor,
        borderColor: borderColor,
        textColor: textColor,
        borderWidth: 1,
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: bgColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: bgColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: borderColor,
        textColor: bgColor,
        borderWidth: 1,
      },
      link: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: bgColor,
        borderWidth: 0,
      },
    };
  }

  return {
    solid: {
      backgroundColor: getColorValue(color, isDark ? 500 : 600),
      borderColor: getColorValue(color, isDark ? 500 : 600),
      textColor: getColorValue(color, isDark ? 950 : 50),
      borderWidth: 1,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: getColorValue(color, isDark ? 500 : 600),
      textColor: getColorValue(color, isDark ? 500 : 600),
      borderWidth: 1,
    },
    soft: {
      backgroundColor: `${getColorValue(color, isDark ? 500 : 600)}${
        isDark ? "20" : "10"
      }`,
      borderColor: "transparent",
      textColor: getColorValue(color, isDark ? 500 : 600),
      borderWidth: 0,
    },
    subtle: {
      backgroundColor: `${getColorValue(color, isDark ? 500 : 600)}${
        isDark ? "20" : "10"
      }`,
      borderColor: getColorValue(color, isDark ? 500 : 600),
      textColor: getColorValue(color, isDark ? 500 : 600),
      borderWidth: 1,
    },
    link: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: getColorValue(color, isDark ? 500 : 600),
      borderWidth: 0,
    },
  };
};

const generateVariantConfigFromBase = (
  baseHex: string,
  colorScheme: "light" | "dark"
): Record<ButtonVariant, ColorConfig> => {
  const isDark = colorScheme === "dark";
  const highContrastText = isDark
    ? getColorValue("zinc", 950)
    : getColorValue("zinc", 50);

  return {
    solid: {
      backgroundColor: baseHex,
      borderColor: baseHex,
      textColor: highContrastText,
      borderWidth: 1,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: baseHex,
      textColor: baseHex,
      borderWidth: 1,
    },
    soft: {
      backgroundColor: `${baseHex}${isDark ? "20" : "10"}`,
      borderColor: "transparent",
      textColor: baseHex,
      borderWidth: 0,
    },
    subtle: {
      backgroundColor: `${baseHex}${isDark ? "20" : "10"}`,
      borderColor: baseHex,
      textColor: baseHex,
      borderWidth: 1,
    },
    link: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: baseHex,
      borderWidth: 0,
    },
  };
};

interface ConfirmationAlert {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

interface ButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  variant?: ButtonVariant;
  color?: UIColor;
  size?: UISize;
  radius?: UIRadius;
  style?: ViewStyle;
  symbol?: string;
  haptic?: boolean;
  hapticStyle?: "light" | "medium" | "heavy";
  confirmationAlert?: ConfirmationAlert;
}

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  selected = false,
  variant = "outline",
  color,
  size = "md",
  radius = "md",
  style,
  symbol,
  haptic = false,
  hapticStyle = "light",
  confirmationAlert,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      const spin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => spin());
      };
      spin();
    } else {
      spinValue.stopAnimation();
    }
  }, [loading, spinValue]);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const { accentHex } = useAccentColor();

  const variantConfig = useMemo(() => {
    const scheme = (colorScheme ?? "light") as "light" | "dark";
    if (color) {
      const variants = generateVariantConfig(color, scheme);
      return variants[variant];
    }
    const baseHex = accentHex || Colors[scheme].tint;
    const variants = generateVariantConfigFromBase(baseHex, scheme);
    return variants[variant];
  }, [color, colorScheme, variant, accentHex]);

  const isDisabled = disabled || loading;

  const buttonStyles = useMemo(() => {
    const baseStyles: ViewStyle = {
      ...styles.button,
      ...SIZE_STYLES[size],
      backgroundColor: variantConfig.backgroundColor,
      borderColor: variantConfig.borderColor,
      borderWidth: variantConfig.borderWidth,
      borderRadius: RADIUS_VALUES[radius],
    };

    return [baseStyles, style];
  }, [size, variantConfig, style, radius]);

  const textStyles = useMemo(() => {
    return [
      styles.buttonText,
      TEXT_SIZE_STYLES[size],
      { color: variantConfig.textColor },
    ];
  }, [size, variantConfig]);

  const iconColor = variantConfig.textColor;
  const displayIcon = loading ? "arrow.2.circlepath" : symbol;

  const shouldCenterIcon = !title && displayIcon;

  const handlePress = () => {
    if (!isDisabled) {
      // Haptic feedback
      if (haptic) {
        const hapticStyleMap = {
          light: Haptics.ImpactFeedbackStyle.Light,
          medium: Haptics.ImpactFeedbackStyle.Medium,
          heavy: Haptics.ImpactFeedbackStyle.Heavy,
        };
        Haptics.impactAsync(hapticStyleMap[hapticStyle]);
      }
      if (confirmationAlert) {
        Alert.alert(confirmationAlert.title, confirmationAlert.message, [
          {
            text: confirmationAlert.cancelText || "Cancel",
            style: "cancel",
            onPress: confirmationAlert.onCancel,
          },
          {
            text: confirmationAlert.confirmText || "Confirm",
            style: "default",
            onPress: confirmationAlert.onConfirm || onPress,
          },
        ]);
      } else {
        onPress();
      }
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        shouldCenterIcon && styles.iconOnly,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
      onPress={isDisabled ? undefined : handlePress}
      disabled={isDisabled}
    >
      {displayIcon &&
        (loading ? (
          <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
            <Icon
              symbol={displayIcon as SFSymbol}
              size={size}
              color={iconColor}
            />
          </Animated.View>
        ) : (
          <Icon
            symbol={displayIcon as SFSymbol}
            size={size}
            color={iconColor}
          />
        ))}
      {title && <Text style={textStyles}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "100%",
    willChange: "transform",
    transform: [{ perspective: 1 }],
  },
  iconOnly: {
    justifyContent: "center",
    gap: 0,
  },
  xs: { height: 28 },
  sm: { height: 36 },
  md: { height: 48 },
  lg: { height: 56 },
  xl: { height: 64 },
  xxl: { height: 72 },
  buttonText: { fontWeight: "600" },
  xsText: { fontSize: 12 },
  smText: { fontSize: 14 },
  mdText: { fontSize: 16 },
  lgText: { fontSize: 18 },
  xlText: { fontSize: 20 },
  xxlText: { fontSize: 22 },
  disabled: { opacity: 0.5 },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
    transitionDuration: "150ms",
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease-in-out",
  },
});

const SIZE_STYLES = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
  "2xl": styles.xxl,
} as const;

const TEXT_SIZE_STYLES = {
  xs: styles.xsText,
  sm: styles.smText,
  md: styles.mdText,
  lg: styles.lgText,
  xl: styles.xlText,
  "2xl": styles.xxlText,
} as const;
