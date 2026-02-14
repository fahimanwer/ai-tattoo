import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import { expo } from "@better-auth/expo";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    rateLimit: {
      window: 60,
      max: 100,
    },
    user: {
      deleteUser: { enabled: true },
    },
    trustedOrigins: [
      "exp://",
      "aitattoo://",
      "aitattoo://**",
      "aitattoo:///(tabs)/home",
      "https://tattoaiapp.com",
      "http://localhost:8081",
      "https://appleid.apple.com",
      "https://ai-tattoo.expo.app",
      "https://ai-tattoo--preview.expo.app",
    ],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        prompt: "select_account",
        redirectURI:
          "https://backend-aitattoo.ashuthefire.com/http/api/auth/callback/google",
      },
      apple: {
        clientId: "com.fahimanwer.tattooai",
      },
    },
    plugins: [
      expo(),
      convex({ authConfig }),
    ],
  });
};
