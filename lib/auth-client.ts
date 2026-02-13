import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

const getBaseURL = () => {
  if (!process.env.EXPO_PUBLIC_CONVEX_SITE_URL) {
    throw new Error("EXPO_PUBLIC_CONVEX_SITE_URL is not set");
  }
  return process.env.EXPO_PUBLIC_CONVEX_SITE_URL;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/http/api/auth",
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: "aitattoo",
      storagePrefix: "aitattoo",
      storage: SecureStore,
    }),
    convexClient(),
  ],
  fetchOptions: {
    onRequest: (context) => {
      console.log("Auth request:", context.url, context.method || "GET");
    },
    onResponse: (context) => {
      console.log("Auth response:", context.response.status, context.response.statusText);
    },
    onError: (context) => {
      console.log("Auth error:", context.error);
    },
  },
});
