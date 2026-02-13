import Svg, { Path } from "react-native-svg";
import { TAB_BAR, TAB_COLORS } from "./tab-bar-constants";

interface TabBarBackgroundProps {
  width: number;
}

/**
 * Generates the SVG path for a pill-shaped tab bar with a bezier curve notch
 * in the center that cradles the camera FAB button.
 */
function getBarPath(width: number): string {
  const h = TAB_BAR.HEIGHT;
  const R = Math.min(h / 2, TAB_BAR.BORDER_RADIUS); // pill corner radius
  const cx = width / 2;
  const nr = TAB_BAR.NOTCH_RADIUS;
  const spread = TAB_BAR.NOTCH_SPREAD;

  // Notch entry/exit points on the top edge
  const notchLeft = cx - nr - spread;
  const notchRight = cx + nr + spread;

  // Pill shape with bezier notch at top center
  // The cubic beziers create a smooth S-curve entry/exit into the notch
  // Control points keep tangent horizontal at the top edge and vertical at the notch bottom
  return [
    // Start at top-left, after left pill arc
    `M ${R},0`,

    // Top edge to notch start
    `L ${notchLeft},0`,

    // Bezier curve entry into notch (smooth S from top to bottom-left of cradle)
    `C ${cx - nr},0 ${cx - nr},${nr} ${cx},${nr}`,

    // Bezier curve exit from notch (mirror: bottom-right of cradle back to top)
    `C ${cx + nr},${nr} ${cx + nr},0 ${notchRight},0`,

    // Top edge to right pill arc
    `L ${width - R},0`,

    // Right pill semicircle (top to bottom)
    `A ${R},${R} 0 0 1 ${width},${R}`,
    `L ${width},${h - R}`,
    `A ${R},${R} 0 0 1 ${width - R},${h}`,

    // Bottom edge
    `L ${R},${h}`,

    // Left pill semicircle (bottom to top)
    `A ${R},${R} 0 0 1 0,${h - R}`,
    `L 0,${R}`,
    `A ${R},${R} 0 0 1 ${R},0`,

    "Z",
  ].join(" ");
}

export function TabBarBackground({ width }: TabBarBackgroundProps) {
  if (width <= 0) return null;

  return (
    <Svg
      width={width}
      height={TAB_BAR.HEIGHT}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Path d={getBarPath(width)} fill={TAB_COLORS.barBackground} />
    </Svg>
  );
}
