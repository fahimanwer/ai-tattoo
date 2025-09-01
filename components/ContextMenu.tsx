import { useSubscription } from "@/hooks/useSubscription";
import { authClient } from "@/lib/auth-client";
import { manageSubscription, presentPaywall } from "@/lib/paywall-utils";
import * as React from "react";
import { Alert, Linking, Share, View } from "react-native";
import {
  Button,
  ContextMenu,
  Host,
  Image,
  Submenu,
  Switch,
} from "../lib/expo-ui-web";

const getProfileOptions = (
  isPlusUser: boolean,
  user: any,
  refreshSubscriptionStatus: () => Promise<void>
) => [
  {
    title: "Subscription",
    systemImage: "crown",
    type: "submenu",
    items: [
      ...(isPlusUser
        ? [
            {
              title: "Manage Subscription",
              systemImage: "gear",
              type: "button",
              action: manageSubscription,
            },
          ]
        : [
            {
              title: "Upgrade to Plus",
              systemImage: "crown.fill",
              type: "button",
              action: async () => {
                try {
                  const success = await presentPaywall();
                  if (success) {
                    await refreshSubscriptionStatus();
                    Alert.alert(
                      "Welcome to Plus! 🎉",
                      "You now have access to all Plus features including unlimited generations and priority support.",
                      [{ text: "Awesome!", style: "default" }]
                    );
                  }
                } catch (error) {
                  console.error("Error presenting paywall:", error);
                  Alert.alert(
                    "Error",
                    "Something went wrong. Please try again or contact support if the issue persists.",
                    [{ text: "OK", style: "default" }]
                  );
                }
              },
            },
          ]),
    ],
  },
  {
    title: "Support & Feedback",
    systemImage: "questionmark.circle",
    type: "submenu",
    items: [
      {
        title: "Contact Support",
        systemImage: "envelope",
        type: "button",
        action: async () => {
          try {
            const subject = "AI Tattoo App Support Request";
            const body = `Hi,\n\nI need help with the AI Tattoo app.\n\nUser ID: ${user?.id}\nEmail: ${user?.email}\n\nDescription:\n[Please describe your issue here]\n\nThanks!`;
            const mailtoUrl = `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`;
            await Linking.openURL(mailtoUrl);
          } catch (error) {
            console.error("Error opening email:", error);
          }
        },
      },
      {
        title: "Rate App",
        systemImage: "star",
        type: "button",
        action: async () => {
          try {
            await Linking.openURL(
              "https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017?action=write-review"
            );
          } catch (error) {
            console.error("Error opening App Store:", error);
          }
        },
      },
      {
        title: "Share with Friends",
        systemImage: "square.and.arrow.up",
        type: "button",
        action: async () => {
          try {
            await Share.share({
              message:
                "Check out AI Tattoo - the amazing app for creating custom tattoo designs with AI! Download it now on the App Store.",
              url: "https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017",
            });
          } catch (error) {
            console.error("Error sharing:", error);
          }
        },
      },
    ],
  },
  {
    title: "Legal",
    systemImage: "doc.text",
    type: "submenu",
    items: [
      {
        title: "Privacy Policy",
        systemImage: "hand.raised",
        type: "button",
        action: async () => {
          try {
            await Linking.openURL("https://tattoaiapp.com/privacy-policy");
          } catch (error) {
            console.error("Error opening privacy policy:", error);
          }
        },
      },
      {
        title: "Terms of Service",
        systemImage: "doc.plaintext",
        type: "button",
        action: async () => {
          try {
            await Linking.openURL("https://tattoaiapp.com/terms-of-service");
          } catch (error) {
            console.error("Error opening terms of service:", error);
          }
        },
      },
    ],
  },
  {
    title: "Account",
    systemImage: "person.circle",
    type: "submenu",
    items: [
      {
        title: "Sign Out",
        systemImage: "arrow.right.square",
        type: "button",
        action: authClient.signOut,
      },
      {
        title: "Delete Account",
        systemImage: "trash",
        type: "button",
        destructive: true,
        action: () => {
          Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action is irreversible and will permanently remove all your data, including your tattoo designs and account information.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete Account",
                style: "destructive",
                onPress: async () => {
                  try {
                    await authClient.deleteUser();
                  } catch (error) {
                    console.error("Error deleting account:", error);
                    Alert.alert(
                      "Error",
                      "Failed to delete account. Please try again or contact support."
                    );
                  }
                },
              },
            ]
          );
        },
      },
    ],
  },
];

export function ContextMenuProfile() {
  const { data: session } = authClient.useSession();
  const { isPlusUser, refreshSubscriptionStatus } = useSubscription();

  const user = session?.user;
  const options = getProfileOptions(
    isPlusUser,
    user,
    refreshSubscriptionStatus
  );

  const renderOption = (
    option: any,
    index: number
  ): React.ReactElement | null => {
    switch (option.type) {
      case "button":
        return (
          <Button
            key={index}
            systemImage={option.systemImage}
            role={option.destructive ? "destructive" : undefined}
            onPress={() => {
              if (option.action) {
                option.action();
              }
            }}
          >
            {option.title}
          </Button>
        );

      case "switch":
        return (
          <Switch
            key={index}
            value={option.value || false}
            label={option.title}
            variant="checkbox"
            onValueChange={option.onValueChange}
          />
        );
      case "submenu":
        return (
          <Submenu
            key={index}
            button={
              <Button systemImage={option.systemImage}>{option.title}</Button>
            }
          >
            {option.items?.map((subItem: any, subIndex: number) =>
              renderOption(subItem, subIndex)
            )}
          </Submenu>
        );
      default:
        return null;
    }
  };

  return (
    <Host style={{ width: 150, height: 50 }}>
      <ContextMenu>
        <ContextMenu.Items>
          {options.map((option, index) => renderOption(option, index))}
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <View>
            <Host style={{ width: 35, height: 35 }}>
              <Image systemName="ellipsis" />
            </Host>
          </View>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}
