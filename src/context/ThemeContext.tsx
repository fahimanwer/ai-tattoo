import {
  DarkTheme,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";
import Storage from "expo-sqlite/kv-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, Platform, useColorScheme } from "react-native";
import { Uniwind } from "uniwind";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  isLight: boolean;
  setMode: (mode: ThemeMode) => void;
  navigationTheme: Theme;
}

const STORAGE_KEY = "@theme_mode";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function loadModeSync(): ThemeMode {
  try {
    const stored = Storage.getItemSync(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // Ignore storage errors, default to system
  }
  return "system";
}

const darkNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#000000",
  },
};

const lightNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F5F5F7",
    card: "#FFFFFF",
  },
};

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(loadModeSync);
  const systemScheme = useColorScheme();

  // Resolve whether we're in dark mode
  const isDark = useMemo(() => {
    if (mode === "system") {
      return systemScheme === "dark";
    }
    return mode === "dark";
  }, [mode, systemScheme]);

  const isLight = !isDark;

  // Sync Uniwind theme and native appearance when mode changes
  useEffect(() => {
    if (mode === "system") {
      Uniwind.setTheme("system");
      if (Platform.OS === "ios") Appearance.setColorScheme(null);
    } else {
      Uniwind.setTheme(mode);
      if (Platform.OS === "ios") Appearance.setColorScheme(mode);
    }
  }, [mode, systemScheme]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      Storage.setItemSync(STORAGE_KEY, newMode);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const navigationTheme = isDark
    ? darkNavigationTheme
    : lightNavigationTheme;

  const value = useMemo(
    () => ({ mode, isDark, isLight, setMode, navigationTheme }),
    [mode, isDark, isLight, setMode, navigationTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within AppThemeProvider");
  }
  return ctx;
}
