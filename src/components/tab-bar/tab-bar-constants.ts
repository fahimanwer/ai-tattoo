import { Dimensions } from "react-native";
import { Color } from "@/src/constants/TWPalette";

// --- Responsive scaling ---
// All dimensions scale proportionally to screen width.
// Designed at 393dp base (iPhone 15 Pro). On a 360dp Android phone
// everything shrinks ~8%; on a 428dp phone it grows ~9%.
const SCREEN_W = Dimensions.get("window").width;
const s = (dp: number) => Math.round((dp / 393) * SCREEN_W);

// --- Dimensions ---
export const TAB_BAR = {
  HEIGHT: s(64),
  PADDING: s(5),
  BORDER_RADIUS: s(32),

  // Active pill
  PILL_HEIGHT: s(44),
  PILL_BORDER_RADIUS: s(22),
  PILL_PADDING_HORIZONTAL: s(14),
  PILL_GAP: s(7),

  // Inactive circle
  CIRCLE_SIZE: s(44),

  // Icon
  ICON_SIZE: s(20),

  // Label
  LABEL_FONT_SIZE: s(13),
  LABEL_FONT_WEIGHT: "600" as const,
  LABEL_LINE_HEIGHT: s(17),

  // FAB
  FAB_SIZE: s(52),
  FAB_ICON_SIZE: s(24),

  // Notch — tighter cradle around the FAB
  NOTCH_RADIUS: s(30), // FAB radius (26) + 4dp gap
  NOTCH_SPREAD: s(10), // short bezier transition

  // Horizontal margin
  BAR_HORIZONTAL_MARGIN: s(10),

  // Flex weights for responsive tab distribution
  ACTIVE_FLEX: 2.4,
  INACTIVE_FLEX: 1,
} as const;

// --- Colors (dark theme adaptation of Figma design) ---
export const TAB_COLORS = {
  barBackground: Color.zinc[900], // #18181b
  inactiveCircle: Color.zinc[800], // #27272a
  inactiveIcon: Color.zinc[400], // #a1a1aa
  activePill: "#FFFFFF",
  activeIcon: Color.zinc[950], // #09090b
  activeLabel: Color.zinc[950], // #09090b
  fabBackground: Color.blue[500], // #3b82f6
  fabIcon: "#FFFFFF",
  fabShadow: "rgba(59,130,246,0.35)",
} as const;

// --- Animation ---
export const TAB_SPRING = {
  damping: 20,
  stiffness: 180,
} as const;
