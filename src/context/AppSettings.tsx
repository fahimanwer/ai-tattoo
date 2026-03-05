import Storage from "expo-sqlite/kv-store";
import React, { createContext, useState } from "react";

/**
 * App Settings Type Definition
 * Add new settings here - they will automatically persist
 */
type AppSettings = {
  isOnboarded: boolean;
  improvePrompt: boolean;
  hasSeenPaywall: boolean;
  hasUsedFreeCredit: boolean;
  hasRequestedReview: boolean;
  onboardingAnswers: Record<string, string | string[]>;
  onboardingAnswersVersion: number;
};

/**
 * Default settings - used on first launch
 */
const DEFAULT_SETTINGS: AppSettings = {
  isOnboarded: false,
  improvePrompt: true,
  hasSeenPaywall: false,
  hasUsedFreeCredit: false,
  hasRequestedReview: false,
  onboardingAnswers: {},
  onboardingAnswersVersion: 1,
};

const STORAGE_KEY = "@app_settings";

type AppSettingsContextType = {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  updateSettingsSync: (updates: Partial<AppSettings>) => void;
  resetSettings: () => Promise<void>;
  // Individual setters for convenience
  setIsOnboarded: (value: boolean) => Promise<void>;
  setIsOnboardedSync: (value: boolean) => void;
  setIsOnboardedWithDelay: (value: boolean, delay?: number) => void;
};

export const AppSettingsContext = createContext<AppSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => Promise.resolve(),
  updateSettingsSync: () => {},
  resetSettings: () => Promise.resolve(),
  setIsOnboarded: () => Promise.resolve(),
  setIsOnboardedSync: () => {},
  setIsOnboardedWithDelay: (value: boolean, delay?: number) => {},
});

// Load settings synchronously from storage
function loadSettingsSync(): AppSettings {
  try {
    const stored = Storage.getItemSync(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
  }
  return DEFAULT_SETTINGS;
}

export function AppSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load settings synchronously on initialization - no loading state needed!
  const [settings, setSettings] = useState<AppSettings>(loadSettingsSync);

  // Update settings (async)
  const updateSettings = async (updates: Partial<AppSettings>) => {
    try {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);
      await Storage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error("Failed to update settings:", error);
      throw error;
    }
  };

  // Update settings (sync) - no await needed!
  const updateSettingsSync = (updates: Partial<AppSettings>) => {
    try {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);
      Storage.setItemSync(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error("Failed to update settings:", error);
      throw error;
    }
  };

  // Reset to defaults
  const resetSettings = async () => {
    try {
      setSettings(DEFAULT_SETTINGS);
      await Storage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset settings:", error);
      throw error;
    }
  };

  // Convenience methods for individual settings
  const setIsOnboarded = async (value: boolean) => {
    await updateSettings({ isOnboarded: value });
  };

  const setIsOnboardedSync = (value: boolean) => {
    updateSettingsSync({ isOnboarded: value });
  };

  const setIsOnboardedWithDelay = (value: boolean, delay?: number) => {
    setTimeout(() => {
      setIsOnboardedSync(value);
    }, delay ?? 2000);
  };

  const value: AppSettingsContextType = {
    settings,
    updateSettings,
    updateSettingsSync,
    resetSettings,
    setIsOnboarded,
    setIsOnboardedSync,
    setIsOnboardedWithDelay,
  };

  return (
    <AppSettingsContext value={value}>
      {children}
    </AppSettingsContext>
  );
}
