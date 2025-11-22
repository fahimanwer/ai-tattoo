import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
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
  const colorScheme = useColorScheme();
  const [selectedHex, setSelectedHex] = useState<string | null>(initialHex);

  const accentHex = useMemo(() => {
    const scheme = (colorScheme ?? "light") as "light" | "dark";
    return selectedHex ?? Colors[scheme].tint;
  }, [selectedHex, colorScheme]);

  const getBackgroundColor = useMemo(() => {
    return () => {
      if (!selectedHex) {
        const scheme = (colorScheme ?? "light") as "light" | "dark";
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

      const scheme = (colorScheme ?? "light") as "light" | "dark";
      const targetShade = scheme === "dark" ? 950 : 50;

      for (const family of colorFamilies) {
        if (
          selectedHex === getColorValue(family, scheme === "dark" ? 400 : 500)
        ) {
          return getColorValue(family, targetShade);
        }
      }

      return Colors[scheme].background;
    };
  }, [selectedHex, colorScheme]);

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
