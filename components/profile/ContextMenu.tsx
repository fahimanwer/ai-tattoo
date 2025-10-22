import { useSubscription } from "@/hooks/useSubscription";
import { authClient } from "@/lib/auth-client";
import * as React from "react";
import { Linking, Share } from "react-native";
import {
  Button,
  ContextMenu,
  Host,
  Submenu,
  Switch,
} from "../../lib/expo-ui-web";

const getProfileOptions = (
  isPlusUser: boolean,
  user: any,
  refreshSubscriptionStatus: () => Promise<void>
) => [
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
              "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193?action=write-review"
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
              url: "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193",
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
    <Host style={{ width: 35, height: 35 }}>
      <ContextMenu>
        <ContextMenu.Items>
          {options.map((option, index) => renderOption(option, index))}
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <Host
            style={{
              width: 35,
              height: 35,
              borderRadius: 99,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button systemImage="ellipsis" size="sm" title="More" />
          </Host>
          {/*   <View>
            <Host style={{ width: 25, height: 25 }}>
              <Image systemName="ellipsis" />
            </Host>
          </View> */}
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}
