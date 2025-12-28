import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
  type TextLayoutLine,
} from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export type TextProps = RNTextProps & {
  children?: ReactNode;
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "base"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "10xl"
    | "11xl"
    | "12xl"
    | "title"
    | "subtitle"
    | "link"
    | "body"
    | "caption";
  weight?:
    | "ultralight"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black";
  variant?: "serif" | "poster";
  /**
   * When true, balances text across lines to create visually pleasing text blocks.
   * Uses onTextLayout to measure lines and constrains width for balanced wrapping.
   * Best for headlines and short text blocks (2-6 lines).
   * @see https://developer.chrome.com/docs/css-ui/css-text-wrap-balance
   */
  textBalance?: boolean;
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = "default",
  weight,
  variant,
  textBalance,
  onTextLayout: userOnTextLayout,
  ...rest
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const sizeStyle = sizeStyles[type];

  const selectedFont = getSelectedFont(variant);
  const fontFamilyStyle = selectedFont
    ? getFontFamilyStyle(selectedFont, weight)
    : undefined;
  const adjustedSizeStyle = selectedFont?.includes("bodoni-moda")
    ? getBodoniAdjustedSizeStyle(type)
    : selectedFont === "oswald"
    ? getOswaldAdjustedSizeStyle(type)
    : undefined;

  // Apply font weight for system font when no variant is specified
  const systemFontWeightStyle =
    !selectedFont && weight ? getSystemFontWeightStyle(weight) : undefined;

  // Text balancing state
  const [balanceState, setBalanceState] = useState<{
    width?: number;
    ready: boolean;
  }>(() => ({ ready: !textBalance })); // Ready immediately if not balancing

  const hasProcessed = useRef(false);
  const pendingLines = useRef<TextLayoutLine[] | null>(null);

  // Handle text layout measurement - store lines in ref for useLayoutEffect
  const handleTextLayout = useCallback(
    (e: Parameters<NonNullable<RNTextProps["onTextLayout"]>>[0]) => {
      // Always call user's handler if provided
      userOnTextLayout?.(e);

      // Skip if not balancing or already processed
      if (!textBalance || hasProcessed.current) return;

      // Store lines and trigger re-render for useLayoutEffect to process
      pendingLines.current = e.nativeEvent.lines;
      setBalanceState((prev) => ({ ...prev })); // Force re-render
    },
    [textBalance, userOnTextLayout]
  );

  // Process balance synchronously with Fabric's useLayoutEffect
  // This runs after render but before paint - no intermediate state visible
  useLayoutEffect(() => {
    if (!textBalance || hasProcessed.current || !pendingLines.current) return;

    const lines = pendingLines.current;
    hasProcessed.current = true;
    pendingLines.current = null;

    // Only balance 2-6 lines (matching CSS behavior for performance)
    if (lines.length < 2 || lines.length > 6) {
      setBalanceState({ ready: true });
      return;
    }

    const lineWidths = lines.map((line) => line.width);
    const maxLineWidth = Math.max(...lineWidths);
    const totalWidth = lineWidths.reduce((sum, w) => sum + w, 0);
    const avgWidth = totalWidth / lines.length;

    // Calculate target width that would create more balanced lines
    // Similar to browser algorithm: find smallest width that maintains line count
    const targetWidth = Math.ceil(
      Math.max(avgWidth * 1.05, maxLineWidth * 0.82)
    );

    // Only apply if it would actually reduce the max width meaningfully
    if (targetWidth < maxLineWidth - 10) {
      setBalanceState({ width: targetWidth, ready: true });
    } else {
      setBalanceState({ ready: true });
    }
  }, [textBalance, balanceState]);

  // Style for balanced text:
  // - Hidden (opacity: 0) while measuring to prevent visual shift
  // - Constrained width and aligned to start once balanced
  const balanceStyle = textBalance
    ? {
        ...(balanceState.width
          ? { maxWidth: balanceState.width, alignSelf: "flex-start" as const }
          : {}),
        // Hide until ready - Fabric ensures this happens before paint
        ...(balanceState.ready ? {} : { opacity: 0 }),
      }
    : undefined;

  return (
    <RNText
      style={
        [
          { color },
          sizeStyle,
          adjustedSizeStyle,
          fontFamilyStyle,
          systemFontWeightStyle,
          balanceStyle,
          style,
        ] as any
      }
      textBreakStrategy="simple"
      onTextLayout={textBalance ? handleTextLayout : userOnTextLayout}
      {...rest}
    />
  );
}

function getSelectedFont(variant?: string): string | undefined {
  switch (variant) {
    case "serif":
      return "bodoni-moda";
    case "poster":
      return "oswald";
    default:
      return undefined; // Use system font
  }
}

function getFontFamilyStyle(fontFamily: string, weight?: string) {
  const isItalic = fontFamily.includes("italic");

  if (fontFamily.includes("bodoni-moda")) {
    const weightMap: Record<string, string> = {
      ultralight: isItalic
        ? "BodoniModa_400Regular_Italic"
        : "BodoniModa_400Regular", // No ultralight, fallback to regular
      thin: isItalic ? "BodoniModa_400Regular_Italic" : "BodoniModa_400Regular", // No thin, fallback to regular
      light: isItalic
        ? "BodoniModa_400Regular_Italic"
        : "BodoniModa_400Regular", // No light, fallback to regular
      normal: isItalic
        ? "BodoniModa_400Regular_Italic"
        : "BodoniModa_400Regular",
      medium: isItalic ? "BodoniModa_500Medium_Italic" : "BodoniModa_500Medium",
      semibold: isItalic
        ? "BodoniModa_600SemiBold_Italic"
        : "BodoniModa_600SemiBold",
      bold: isItalic ? "BodoniModa_700Bold_Italic" : "BodoniModa_700Bold",
      heavy: isItalic
        ? "BodoniModa_800ExtraBold_Italic"
        : "BodoniModa_800ExtraBold",
      black: isItalic ? "BodoniModa_900Black_Italic" : "BodoniModa_900Black",
    };
    return { fontFamily: weightMap[weight || "normal"] };
  }

  if (fontFamily === "oswald") {
    const weightMap: Record<string, string> = {
      ultralight: "Oswald_200ExtraLight",
      thin: "Oswald_200ExtraLight",
      light: "Oswald_300Light",
      normal: "Oswald_400Regular",
      medium: "Oswald_500Medium",
      semibold: "Oswald_600SemiBold",
      bold: "Oswald_700Bold",
      heavy: "Oswald_700Bold",
      black: "Oswald_700Bold",
    };
    return { fontFamily: weightMap[weight || "normal"] };
  }

  // Return undefined to use system font as default
  return undefined;
}

function getBodoniAdjustedSizeStyle(type: string) {
  const adjustments: Record<string, { lineHeight: number }> = {
    xs: { lineHeight: 18 },
    sm: { lineHeight: 22 },
    default: { lineHeight: 28 },
    base: { lineHeight: 28 },
    lg: { lineHeight: 32 },
    xl: { lineHeight: 32 },
    "2xl": { lineHeight: 36 },
    "3xl": { lineHeight: 42 },
    "4xl": { lineHeight: 50 },
    "5xl": { lineHeight: 66 },
    "6xl": { lineHeight: 80 },
    "7xl": { lineHeight: 96 },
    "8xl": { lineHeight: 128 },
    "9xl": { lineHeight: 168 },
    "10xl": { lineHeight: 208 },
    "11xl": { lineHeight: 248 },
    "12xl": { lineHeight: 288 },
    title: { lineHeight: 40 },
    subtitle: { lineHeight: 32 },
    body: { lineHeight: 24 },
    caption: { lineHeight: 18 },
    link: { lineHeight: 34 },
  };

  return adjustments[type] || {};
}

function getOswaldAdjustedSizeStyle(type: string) {
  const adjustments: Record<string, { lineHeight: number }> = {
    "8xl": { lineHeight: 120 },
    "9xl": { lineHeight: 160 },
    "10xl": { lineHeight: 200 },
    "11xl": { lineHeight: 240 },
    "12xl": { lineHeight: 280 },
  };

  return adjustments[type] || {};
}

function getSystemFontWeightStyle(weight: string) {
  const weightStyles: Record<string, { fontWeight: any }> = {
    ultralight: { fontWeight: "100" },
    thin: { fontWeight: "200" },
    light: { fontWeight: "300" },
    normal: { fontWeight: "400" },
    medium: { fontWeight: "500" },
    semibold: { fontWeight: "600" },
    bold: { fontWeight: "700" },
    heavy: { fontWeight: "800" },
    black: { fontWeight: "900" },
  };

  return weightStyles[weight] || { fontWeight: "400" };
}

const sizeStyles = StyleSheet.create({
  default: { fontSize: 16, lineHeight: 24 },
  base: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  "2xl": { fontSize: 24, lineHeight: 32 },
  "3xl": { fontSize: 30, lineHeight: 36 },
  "4xl": { fontSize: 36, lineHeight: 44 },
  "5xl": { fontSize: 48, lineHeight: 58 },
  "6xl": { fontSize: 60, lineHeight: 72 },
  "7xl": { fontSize: 72, lineHeight: 86 },
  "8xl": { fontSize: 96, lineHeight: 116 },
  "9xl": { fontSize: 128, lineHeight: 154 },
  "10xl": { fontSize: 160, lineHeight: 192 },
  "11xl": { fontSize: 192, lineHeight: 230 },
  "12xl": { fontSize: 220, lineHeight: 268 },
  title: { fontSize: 32, lineHeight: 32 },
  subtitle: { fontSize: 20, lineHeight: 28 },
  body: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
  link: { lineHeight: 30, fontSize: 16 },
});
