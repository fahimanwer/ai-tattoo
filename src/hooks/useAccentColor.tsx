import { Colors } from "@/src/constants/Colors";
import { useTheme } from "@/src/context/ThemeContext";
import { getColorValue, UIColor } from "@/src/types/ui";
import React, { createContext, useContext, useMemo, useState } from "react";

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

  const accentHex = useMemo(() => {
    const scheme = isDark ? "dark" : "light";
    return selectedHex ?? Colors[scheme].tint;
  }, [selectedHex, isDark]);

  const getBackgroundColor = useMemo(() => {
    return () => {
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
  }, [selectedHex, isDark]);

  const value = useMemo(
    () => ({ accentHex, setAccentHex: setSelectedHex, getBackgroundColor }),
    [accentHex, getBackgroundColor]
  );

  return (
    <AccentColorContext.Provider value={value}>
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const ctx = useContext(AccentColorContext);
  if (!ctx) {
    throw new Error(
      "useAccentColor must be used within an AccentColorProvider"
    );
  }
  return ctx;
}
