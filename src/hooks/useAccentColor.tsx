import { Colors } from "@/src/constants/Colors";
import { useTheme } from "@/src/context/ThemeContext";
import { getColorValue, UIColor } from "@/src/types/ui";
import React, { createContext, use, useState } from "react";

interface AccentColorContextValue {
  accentHex: string;
  setAccentHex: (hex: string | null) => void;
  getBackgroundColor: () => string;
}

const AccentColorContext = createContext<AccentColorContextValue | undefined>(
  undefined
);

export function AccentColorProvider({
  children,
  initialHex = null,
}: {
  children: React.ReactNode;
  initialHex?: string | null;
}) {
  const { isDark } = useTheme();
  const [selectedHex, setSelectedHex] = useState<string | null>(initialHex);

  const accentHex = selectedHex ?? Colors[isDark ? "dark" : "light"].tint;

  const getBackgroundColor = () => {
    if (!selectedHex) {
      const scheme = isDark ? "dark" : "light";
      return Colors[scheme].background;
    }

    const colorFamilies: UIColor[] = [
      "slate",
      "gray",
      "zinc",
      "neutral",
      "stone",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ];

    const scheme = isDark ? "dark" : "light";
    const targetShade = isDark ? 950 : 50;

    for (const family of colorFamilies) {
      if (
        selectedHex === getColorValue(family, scheme === "dark" ? 400 : 500)
      ) {
        return getColorValue(family, targetShade);
      }
    }

    return Colors[scheme].background;
  };

  const value = { accentHex, setAccentHex: setSelectedHex, getBackgroundColor };

  return (
    <AccentColorContext value={value}>
      {children}
    </AccentColorContext>
  );
}

export function useAccentColor() {
  const ctx = use(AccentColorContext);
  if (!ctx) {
    throw new Error(
      "useAccentColor must be used within an AccentColorProvider"
    );
  }
  return ctx;
}
