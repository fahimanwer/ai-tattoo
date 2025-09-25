import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

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

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: "aitattoo",
      storagePrefix: "aitattoo",
      storage: SecureStore,
    }),
  ],
});
