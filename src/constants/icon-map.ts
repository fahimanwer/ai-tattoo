import type Ionicons from "@expo/vector-icons/Ionicons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

/**
 * Centralized SF Symbol → Ionicons mapping for Android fallback.
 * SF Symbols are iOS-only; on Android we render Ionicons equivalents.
 */
export const SF_TO_IONICON: Record<string, IoniconName> = {
  "camera.fill": "camera",
  "camera.viewfinder": "scan-outline",
  "exclamationmark.triangle.fill": "warning",
  "photo.fill.on.rectangle.fill": "images-outline",
  "photo.on.rectangle": "images-outline",
  "icloud.and.arrow.down": "cloud-download-outline",
  "wand.and.stars": "color-wand-outline",
  "arrow.triangle.2.circlepath": "sync-outline",
  "paintbrush.pointed.fill": "brush-outline",
  "figure.stand": "body-outline",
  sparkles: "sparkles-outline",
  "clock.fill": "time",
  "clock.arrow.circlepath": "time-outline",
  "square.and.arrow.down": "download-outline",
  "square.and.arrow.up": "share-outline",
  "person.crop.rectangle": "person-outline",
  "lightbulb.max": "bulb-outline",
  lightbulb: "bulb-outline",
  "eraser.line.dashed": "cut-outline",
  "chevron.right": "chevron-forward",
  "chevron.left": "chevron-back",
  "chevron.up.chevron.down": "swap-vertical-outline",
  grid: "grid-outline",
  circle: "radio-button-off",
  "circle.fill": "radio-button-on",
  checkmark: "checkmark",
  "checkmark.circle.fill": "checkmark-circle",
  trash: "trash-outline",
  xmark: "close",
  heart: "heart-outline",
  "heart.fill": "heart",
  "arrow.clockwise": "refresh",
  "arrow.trianglehead.2.clockwise.rotate.90.camera": "camera-reverse-outline",
};

/** Look up the Ionicons name for an SF Symbol. Falls back to `ellipse-outline`. */
export function getIoniconName(sfSymbol: string): IoniconName {
  return SF_TO_IONICON[sfSymbol] ?? "ellipse-outline";
}
