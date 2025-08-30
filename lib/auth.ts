import { PrismaClient } from "@/prisma/generated/client/edge";
import { expo } from "@better-auth/expo";
import { withAccelerate } from "@prisma/extension-accelerate";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo()],
  socialProviders: {
    google: {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "select_account",
    },
    apple: {
      clientId: "dev.codewithbeto.aitattoo",
    },
  },
  trustedOrigins: [
    "exp://",
    "aitattoo://**",
    "aitattoo:///(tabs)/home",
    "https://tattoaiapp.com",
    "https://appleid.apple.com",
  ],
});
