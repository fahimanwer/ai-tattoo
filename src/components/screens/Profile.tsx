import {
  Accordion,
  Button,
  Chip,
  Separator,
  Switch,
  useThemeColor,
} from "heroui-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Application from "expo-application";
import React from "react";
import {
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useProfileData } from "./profile/useProfileData";
import { ActionRow, ProfileRow, SectionCard } from "./profile/ProfileComponents";

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

  const muted = useThemeColor("muted");
  const fg = useThemeColor("foreground");

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      {/* Sign-in prompt */}
      {!isAuthenticated && (
        <SectionCard>
          <View style={{ alignItems: "center", paddingVertical: 24, gap: 12 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "rgba(255,255,255,0.08)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <Ionicons name="person-outline" size={28} color={muted} />
            </View>
            <Text style={{ color: fg, fontSize: 17, fontWeight: "600" }}>
              Not signed in
            </Text>
            <Text style={{ color: muted, fontSize: 14, textAlign: "center" }}>
              Sign in to access your account details, subscription info, and
              personalized features
            </Text>
            <Button
              variant="primary"
              onPress={() =>
                router.push({
                  pathname: "/auth-sheet",
                  params: { dismissImmediately: "true" },
                })
              }
              style={{ marginTop: 8, width: "100%" }}
            >
              <Button.Label>Sign In</Button.Label>
            </Button>
          </View>
        </SectionCard>
      )}

      {/* Account Section */}
      {isAuthenticated && (
        <SectionCard title="Account">
          <ProfileRow label="Name" value={displayName} />
          <Separator />
          <ProfileRow label="Email" value={user?.email ?? ""} />
          <Separator />
          <ProfileRow label="Model" value={modelDisplayName} />
          {memberSince && (
            <>
              <Separator />
              <ProfileRow label="Member Since" value={memberSince} valueColor={muted} />
            </>
          )}
        </SectionCard>
      )}

      {/* Plan Section */}
      {isAuthenticated && (hasActiveSubscription || hasActiveUsagePeriod) && (
        <SectionCard
          title={hasActiveSubscription ? "Plan" : "Active Usage Period"}
          footer={
            remaining === 0
              ? "You've reached your generation limit. Upgrade to continue."
              : undefined
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
            }}
          >
            <Text style={{ color: muted, fontSize: 15 }}>Current Plan</Text>
            <Chip variant="primary" size="sm">
              <Chip.Label style={{ fontWeight: "700" }}>
                {planBadge.name}
              </Chip.Label>
            </Chip>
          </View>
          <Separator />
          <Accordion selectionMode="single" hideSeparator>
            <Accordion.Item value="plan-details">
              <Accordion.Trigger>
                <Text style={{ color: fg, fontSize: 15, flex: 1 }}>
                  Plan Details
                </Text>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <View style={{ gap: 4 }}>
                  <ProfileRow
                    label="Status"
                    value={
                      lastSubscription?.unsubscribeDetectedAt
                        ? "Cancelled (Active)"
                        : getStatusDisplay().text
                    }
                    valueColor={getStatusDisplay().color}
                  />
                  {lastSubscription?.expiresDate && (
                    <ProfileRow
                      label={lastSubscription?.willRenew ? "Renews On" : "Expires On"}
                      value={new Date(lastSubscription.expiresDate).toLocaleDateString()}
                    />
                  )}
                  {lastSubscription?.daysRemaining != null &&
                    lastSubscription.daysRemaining > 0 && (
                      <ProfileRow
                        label="Days Remaining"
                        value={`${lastSubscription.daysRemaining} days`}
                        valueColor={
                          lastSubscription.daysRemaining <= 3 ? "#f59e0b" : "#10b981"
                        }
                      />
                    )}
                  {lastSubscription?.price && (
                    <ProfileRow
                      label="Price"
                      value={`${lastSubscription.price.currency} $${lastSubscription.price.amount}`}
                    />
                  )}
                  <ProfileRow
                    label="Billing Period"
                    value={`${periodStart ? new Date(periodStart).toLocaleDateString() : "N/A"} - ${periodEnd ? new Date(periodEnd).toLocaleDateString() : "N/A"}`}
                  />
                </View>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <Separator />
          <View style={{ paddingVertical: 8 }}>
            <Button
              variant="secondary"
              onPress={() => router.push("/(paywall)")}
              style={{ width: "100%" }}
            >
              <Button.Label>
                {hasActiveSubscription ? "Manage Plan" : "Upgrade Plan"}
              </Button.Label>
            </Button>
          </View>
        </SectionCard>
      )}

      {/* We Miss You Section */}
      {isAuthenticated &&
        !hasActiveSubscription &&
        !hasActiveUsagePeriod &&
        lastSubscription && (
          <SectionCard title="We Miss You!">
            <ProfileRow
              label="Previous Plan"
              value={lastSubscription.productName || "Unknown"}
              valueColor={planColor}
            />
            <Separator />
            <ProfileRow
              label="Status"
              value={getStatusDisplay().text}
              valueColor={getStatusDisplay().color}
            />
            <Separator />
            <View style={{ paddingVertical: 8 }}>
              <Button
                variant="primary"
                onPress={() => router.push("/(paywall)")}
                style={{ width: "100%" }}
              >
                <Button.Label>Come Back & Create</Button.Label>
              </Button>
            </View>
          </SectionCard>
        )}

      {/* Enjoying the app? */}
      <SectionCard>
        <Accordion selectionMode="single" hideSeparator>
          <Accordion.Item value="enjoying">
            <Accordion.Trigger>
              <Text style={{ color: fg, fontSize: 15, flex: 1 }}>
                Enjoying the app?
              </Text>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <View style={{ gap: 12, paddingVertical: 8 }}>
                <Text style={{ color: muted, fontSize: 14, lineHeight: 20 }}>
                  If you're enjoying Inkigo, a review helps other tattoo lovers
                  discover us. You can also reach out anytime with feedback or
                  feature ideas.
                </Text>
                <Button variant="secondary" onPress={handleRateApp}>
                  <Button.Label>Rate on Play Store</Button.Label>
                </Button>
                <Button variant="ghost" onPress={handleSendFeedback}>
                  <Button.Label>Send Feedback</Button.Label>
                </Button>
              </View>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </SectionCard>

      {/* Are you an artist? */}
      <SectionCard>
        <Accordion selectionMode="single" hideSeparator>
          <Accordion.Item value="artist">
            <Accordion.Trigger>
              <Text style={{ color: fg, fontSize: 15, flex: 1 }}>
                Are you an artist?
              </Text>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <View style={{ gap: 12, paddingVertical: 8 }}>
                <Text style={{ color: muted, fontSize: 14, lineHeight: 20 }}>
                  Interested in collaborating? Have suggestions or complaints?
                  We'd love to hear from you!
                </Text>
                <Button variant="secondary" onPress={handleArtistContact}>
                  <Button.Label>Write to Us</Button.Label>
                </Button>
              </View>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </SectionCard>

      {/* Support & Feedback */}
      <SectionCard title="Support & Feedback">
        <ActionRow title="Rate App" icon="star-outline" onPress={handleRateApp} />
        <Separator />
        <ActionRow
          title="Share with Friends"
          icon="share-outline"
          onPress={handleShareApp}
        />
        <Separator />
        <ActionRow
          title="Contact Support"
          icon="mail-outline"
          onPress={handleContactSupport}
        />
      </SectionCard>

      {/* Follow Us */}
      <SectionCard title="Follow Us">
        <ActionRow
          title="inkigo.ai"
          icon="globe-outline"
          onPress={() => Linking.openURL("https://inkigo.ai")}
        />
        <Separator />
        <ActionRow
          title="Instagram"
          icon="logo-instagram"
          onPress={() => Linking.openURL("https://www.instagram.com/inkigoapp")}
        />
        <Separator />
        <ActionRow
          title="TikTok"
          icon="logo-tiktok"
          onPress={() => Linking.openURL("https://www.tiktok.com/@inkigoapp")}
        />
        <Separator />
        <ActionRow
          title="X"
          icon="logo-twitter"
          onPress={() => Linking.openURL("https://x.com/inkigoapp")}
        />
      </SectionCard>

      {/* Settings */}
      <SectionCard
        title="Settings"
        footer={`Version ${Application.nativeApplicationVersion}`}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Ionicons name="refresh-outline" size={20} color={muted} />
            <Text style={{ color: fg, fontSize: 15 }}>Show Onboarding</Text>
          </View>
          <Switch
            isSelected={!settings.isOnboarded}
            onSelectedChange={() =>
              updateSettings({ isOnboarded: !(settings.isOnboarded ?? true) })
            }
          />
        </View>
        <Separator />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Ionicons name="sparkles-outline" size={20} color={muted} />
            <Text style={{ color: fg, fontSize: 15 }}>Prompt Enhancement</Text>
          </View>
          <Switch
            isSelected={settings.improvePrompt}
            onSelectedChange={() => {
              const newValue = !settings.improvePrompt;
              updateSettings({ improvePrompt: newValue });
              if (!newValue) {
                Alert.alert(
                  "Prompt Enhancement Disabled",
                  "Results may vary without enhancement. Turn it back on anytime.",
                  [{ text: "OK" }]
                );
              }
            }}
          />
        </View>
      </SectionCard>

      {/* Legal */}
      <SectionCard title="Legal">
        <ActionRow
          title="Privacy Policy"
          icon="shield-outline"
          onPress={handlePrivacyPolicy}
        />
        <Separator />
        <ActionRow
          title="Terms of Service"
          icon="document-text-outline"
          onPress={handleTermsOfService}
        />
      </SectionCard>

      {/* Sign Out */}
      {isAuthenticated && (
        <Button variant="danger" onPress={handleSignOut} style={{ width: "100%" }}>
          <Button.Label>Log Out</Button.Label>
        </Button>
      )}

      {/* Delete Account */}
      {isAuthenticated && (
        <SectionCard
          title="Danger Zone"
          footer="Deleting your account is permanent. This does NOT cancel active subscriptions."
        >
          <View style={{ paddingVertical: 8 }}>
            <Button
              variant="danger-soft"
              onPress={handleDeleteAccount}
              style={{ width: "100%" }}
            >
              <Button.Label>Delete Account</Button.Label>
            </Button>
          </View>
        </SectionCard>
      )}
    </ScrollView>
  );
}
