import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "https://tattoaiapp.com",
  // baseURL: "http://localhost:8081",
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: "aitattoo",
      storagePrefix: "aitattoo",
      storage: SecureStore,
    }),
  ],
});
