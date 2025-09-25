import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import Storage from "expo-sqlite/kv-store";

const getBaseURL = () => {
  if (process.env.EXPO_PUBLIC_BASE_URL) {
    return process.env.EXPO_PUBLIC_BASE_URL;
  }
  // Development fallback
  if (__DEV__) {
    return "http://localhost:8081";
  }
  // Production fallback
  return "https://tattoaiapp.com";
};

// Create a storage wrapper that handles the async/sync mismatch in better-auth expo plugin
const storageAdapter = {
  getItem: (key: string) => {
    // The plugin uses await but expects sync interface - return the async method
    return Storage.getItem(key) as any;
  },
  setItem: (key: string, value: string) => {
    // The plugin uses await but expects sync interface - return the async method
    return Storage.setItem(key, value) as any;
  },
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: "aitattoo",
      storagePrefix: "aitattoo",
      storage: storageAdapter,
    }),
  ],
});
