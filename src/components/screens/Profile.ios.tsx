import { Color } from "@/src/constants/TWPalette";
import { type ThemeMode, useTheme } from "@/src/context/ThemeContext";
import {
  Button,
  ContentUnavailableView,
  DisclosureGroup,
  Form,
  Host,
  Label,
  LabeledContent,
  Picker,
  Section,
  Text,
  Toggle,
  VStack,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  font,
  foregroundStyle,
  onTapGesture,
  pickerStyle,
  refreshable,
  tag,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import * as Application from "expo-application";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Activity, useState } from "react";
import { Alert, Linking } from "react-native";
import { toast } from "sonner-native";
import { useProfileData } from "./profile/useProfileData";
import { PlanSection, WeMissYouSection } from "./profile/PlanSection.ios";

function FormButton({
  title,
  systemImage,
  onPress,
  color,
}: {
  title: string;
  systemImage: string;
  onPress: () => void;
  color?: string;
}) {
  return (
    <Button
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
      modifiers={color ? [foregroundStyle({ type: "color", color })] : undefined}
    >
      <Label title={title} systemImage={systemImage} />
    </Button>
  );
}

export function Profile() {
  const {
    user,
    settings,
    updateSettings,
    isRefreshing,
    isAuthenticated,
    displayName,
    memberSince,
    modelDisplayName,
    planBadge,
    planColor,
    lastSubscription,
    hasActiveSubscription,
    hasActiveUsagePeriod,
    remaining,
    periodStart,
    periodEnd,
    getStatusDisplay,
    handleRefresh,
    handleContactSupport,
    handleRateApp,
    handleShareApp,
    handleArtistContact,
    handleSendFeedback,
    handlePrivacyPolicy,
    handleTermsOfService,
    handleSignOut,
    handleDeleteAccount,
    router,
  } = useProfileData();

  const [isSecretExpanded, setIsSecretExpanded] = useState(false);
  const [isArtistExpanded, setIsArtistExpanded] = useState(false);
  const { mode: themeMode, setMode: setThemeMode } = useTheme();

  return (
    <Host style={{ flex: 1 }}>
      <Form modifiers={[refreshable(handleRefresh)]}>
        {/* Sign-in prompt */}
        <Activity mode={isAuthenticated ? "hidden" : "visible"}>
          <Section>
            <VStack>
              <ContentUnavailableView
                title="Not signed in"
                description="Sign in to access your account details, subscription info, and personalized features"
                systemImage="person.crop.circle.badge.exclamationmark"
              />
              <Button
                label="Sign in"
                modifiers={[
                  buttonStyle("borderedProminent"),
                  tint("#3563E9"),
                  foregroundStyle("white"),
                  font({ weight: "bold" }),
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/auth-sheet",
                    params: { dismissImmediately: "true" },
                  })
                }
              />
            </VStack>
          </Section>
        </Activity>

        {/* Account section */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section
            title="Account"
            footer={
              <Text
                modifiers={[
                  onTapGesture(async () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    await Clipboard.setStringAsync(user?.id ?? "");
                    toast.success("User ID copied to clipboard");
                  }),
                ]}
              >{`User ID: ${user?.id}`}</Text>
            }
          >
            <LabeledContent label="Name">
              <Text>{displayName}</Text>
            </LabeledContent>
            <LabeledContent label="Email">
              <Text>{user?.email ?? ""}</Text>
            </LabeledContent>
            <LabeledContent label="Model">
              <Text>{modelDisplayName}</Text>
            </LabeledContent>
            <Activity mode={memberSince ? "visible" : "hidden"}>
              <LabeledContent label="Member Since">
                <Text
                  modifiers={[
                    foregroundStyle({ type: "color", color: Color.zinc[400] }),
                  ]}
                >
                  {memberSince ?? ""}
                </Text>
              </LabeledContent>
            </Activity>
          </Section>
        </Activity>

        {/* Plan section */}
        <Activity
          mode={
            isAuthenticated && (hasActiveSubscription || hasActiveUsagePeriod)
              ? "visible"
              : "hidden"
          }
        >
          <PlanSection
            planBadge={planBadge}
            planColor={planColor}
            hasActiveSubscription={hasActiveSubscription}
            lastSubscription={lastSubscription}
            remaining={remaining}
            periodStart={periodStart}
            periodEnd={periodEnd}
            getStatusDisplay={getStatusDisplay}
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
          />
        </Activity>

        {/* We Miss You section */}
        <Activity
          mode={
            isAuthenticated &&
            !hasActiveSubscription &&
            !hasActiveUsagePeriod &&
            lastSubscription
              ? "visible"
              : "hidden"
          }
        >
          <WeMissYouSection
            planColor={planColor}
            lastSubscription={lastSubscription}
            getStatusDisplay={getStatusDisplay}
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
          />
        </Activity>

        {/* Enjoying the app? */}
        <Section
          footer={
            isSecretExpanded ? (
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[400] }),
                ]}
              >
                Your feedback helps us improve the app for everyone.
              </Text>
            ) : null
          }
        >
          <DisclosureGroup
            isExpanded={isSecretExpanded}
            onIsExpandedChange={setIsSecretExpanded}
            label="Enjoying the app?"
            modifiers={[tint("#3563E9")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[300] }),
                ]}
              >
                {"We'd love to hear from you!"}
              </Text>
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[400] }),
                ]}
              >
                {
                  "If you're enjoying Inkigo, a review on the App Store helps other tattoo lovers discover us. You can also reach out anytime with feedback or feature ideas."
                }
              </Text>
            </VStack>
            <FormButton
              title="Rate on App Store"
              systemImage="star.fill"
              onPress={handleRateApp}
              color={"#3563E9"}
            />
            <FormButton
              title="Send Feedback"
              systemImage="envelope.fill"
              onPress={handleSendFeedback}
              color={Color.zinc[500]}
            />
          </DisclosureGroup>
        </Section>

        {/* Are you an artist? */}
        <Section>
          <DisclosureGroup
            isExpanded={isArtistExpanded}
            onIsExpandedChange={setIsArtistExpanded}
            label="Are you an artist?"
            modifiers={[tint("#3563E9")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[300] }),
                ]}
              >
                {
                  "Interested in collaborating? Have suggestions or complaints? We'd love to hear from you!"
                }
              </Text>
            </VStack>
            <FormButton
              title="Write to Us"
              systemImage="envelope.fill"
              onPress={handleArtistContact}
              color={Color.blue[500]}
            />
          </DisclosureGroup>
        </Section>

        {/* Support & Feedback */}
        <Section title="Support & Feedback">
          <FormButton title="Rate App" systemImage="star.fill" onPress={handleRateApp} />
          <FormButton title="Share with Friends" systemImage="square.and.arrow.up.fill" onPress={handleShareApp} />
          <FormButton title="Contact Support" systemImage="envelope.fill" onPress={handleContactSupport} />
        </Section>

        {/* Follow Us */}
        <Section title="Follow Us">
          <FormButton title="inkigo.ai" systemImage="globe" onPress={() => Linking.openURL("https://inkigo.ai")} />
          <FormButton title="Instagram" systemImage="camera.fill" onPress={() => Linking.openURL("https://www.instagram.com/inkigoapp")} />
          <FormButton title="TikTok" systemImage="video.fill" onPress={() => Linking.openURL("https://www.tiktok.com/@inkigoapp")} />
          <FormButton title="X" systemImage="bubble.left.fill" onPress={() => Linking.openURL("https://x.com/inkigoapp")} />
        </Section>

        {/* Settings */}
        <Section
          title="Settings"
          footer={
            <Text modifiers={[foregroundStyle({ type: "color", color: Color.zinc[500] })]}>
              {`Version ${Application.nativeApplicationVersion}`}
            </Text>
          }
        >
          <Picker
            label="Appearance"
            selection={themeMode}
            onSelectionChange={(v) => setThemeMode(v as ThemeMode)}
            modifiers={[pickerStyle("segmented")]}
          >
            <Text modifiers={[tag("light")]}>Light</Text>
            <Text modifiers={[tag("dark")]}>Dark</Text>
            <Text modifiers={[tag("system")]}>System</Text>
          </Picker>
          <LabeledContent label="Show Onboarding">
            <Toggle
              isOn={!settings.isOnboarded}
              onIsOnChange={() => updateSettings({ isOnboarded: !(settings.isOnboarded ?? true) })}
            />
          </LabeledContent>
          <LabeledContent label="Prompt Enhancement">
            <Toggle
              isOn={settings.improvePrompt}
              onIsOnChange={() => {
                const newValue = !settings.improvePrompt;
                updateSettings({ improvePrompt: newValue });
                if (!newValue) {
                  Alert.alert(
                    "Prompt Enhancement Disabled",
                    "We enhance your prompts to create better tattoo designs. With this off, you have full control but results may vary.\n\nYou can turn it back on anytime.",
                    [{ text: "OK" }]
                  );
                }
              }}
            />
          </LabeledContent>
        </Section>

        {/* Legal */}
        <Section title="Legal">
          <FormButton title="Privacy Policy" systemImage="hand.raised.fill" onPress={handlePrivacyPolicy} />
          <FormButton title="Terms of Service" systemImage="doc.text.fill" onPress={handleTermsOfService} />
        </Section>

        {/* Log out */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section>
            <FormButton title="Log out" systemImage="rectangle.portrait.and.arrow.right.fill" onPress={handleSignOut} />
          </Section>
        </Activity>

        {/* Danger Zone */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section
            title="Danger Zone"
            footer={
              <Text>
                Deleting your account is permanent and cannot be undone. All your data, tattoos, and history will be lost forever. This does NOT cancel active subscriptions — cancel in Settings → Apple ID → Subscriptions first.
              </Text>
            }
          >
            <FormButton
              title="Delete Account"
              systemImage="exclamationmark.triangle.fill"
              color={Color.zinc[500]}
              onPress={handleDeleteAccount}
            />
          </Section>
        </Activity>
      </Form>
    </Host>
  );
}
