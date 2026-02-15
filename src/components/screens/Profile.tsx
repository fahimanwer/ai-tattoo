import {
  Accordion,
  Button,
  Chip,
  Separator,
  useThemeColor,
} from "heroui-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Application from "expo-application";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useProfileData } from "./profile/useProfileData";
import {
  ActionRow,
  LanguagePickerModal,
  ProfileRow,
  SectionCard,
  SettingsToggleRow,
} from "./profile/ProfileComponents";
import { type ThemeMode, useTheme } from "@/src/context/ThemeContext";
import { ScreenHeader } from "../ui/ScreenHeader";
import { useLanguage, AUTO_LANGUAGE } from "@/src/hooks/useLanguage";

export function Profile() {
  const { t } = useTranslation();
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const {
    selectedLanguage,
    currentLanguageName,
    isAutoDetect,
    availableLanguages,
    changeLanguage: handleLanguageChange,
  } = useLanguage();
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
  const { mode: themeMode, setMode: setThemeMode, isDark } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 20 }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <ScreenHeader title={t('profile.title')} />

      {/* Sign-in prompt */}
      {!isAuthenticated && (
        <SectionCard>
          <View style={{ alignItems: "center", paddingVertical: 24, gap: 12 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.05)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <Ionicons name="person-outline" size={28} color={muted} />
            </View>
            <Text style={{ color: fg, fontSize: 17, fontWeight: "600" }}>
              {t('profile.notSignedIn')}
            </Text>
            <Text style={{ color: muted, fontSize: 14, textAlign: "center" }}>
              {t('profile.signInPrompt')}
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
              <Button.Label>{t('auth.signIn')}</Button.Label>
            </Button>
          </View>
        </SectionCard>
      )}

      {/* Account Section */}
      {isAuthenticated && (
        <SectionCard title={t('profile.account')}>
          <ProfileRow label={t('profile.name')} value={displayName} />
          <Separator />
          <ProfileRow label={t('profile.email')} value={user?.email ?? ""} />
          <Separator />
          <ProfileRow label={t('profile.model')} value={modelDisplayName} />
          {memberSince && (
            <>
              <Separator />
              <ProfileRow label={t('profile.memberSince')} value={memberSince} valueColor={muted} />
            </>
          )}
        </SectionCard>
      )}

      {/* Plan Section */}
      {isAuthenticated && (hasActiveSubscription || hasActiveUsagePeriod) && (
        <SectionCard
          title={hasActiveSubscription ? t('profile.plan') : t('profile.activeUsagePeriod')}
          footer={
            remaining === 0
              ? t('profile.limitReachedFooter')
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
            <Text style={{ color: muted, fontSize: 15 }}>{t('profile.currentPlan')}</Text>
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
                  {t('profile.planDetails')}
                </Text>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <View style={{ gap: 4 }}>
                  <ProfileRow
                    label={t('profile.status')}
                    value={
                      lastSubscription?.unsubscribeDetectedAt
                        ? t('profile.cancelledActive')
                        : getStatusDisplay().text
                    }
                    valueColor={getStatusDisplay().color}
                  />
                  {lastSubscription?.expiresDate && (
                    <ProfileRow
                      label={lastSubscription?.willRenew ? t('profile.renewsOn') : t('profile.expiresOn')}
                      value={new Date(lastSubscription.expiresDate).toLocaleDateString()}
                    />
                  )}
                  {lastSubscription?.daysRemaining != null &&
                    lastSubscription.daysRemaining > 0 && (
                      <ProfileRow
                        label={t('profile.daysRemaining')}
                        value={t('profile.daysValue', { count: lastSubscription.daysRemaining })}
                        valueColor={
                          lastSubscription.daysRemaining <= 3 ? "#f59e0b" : "#10b981"
                        }
                      />
                    )}
                  {lastSubscription?.price && (
                    <ProfileRow
                      label={t('profile.price')}
                      value={`${lastSubscription.price.currency} $${lastSubscription.price.amount}`}
                    />
                  )}
                  <ProfileRow
                    label={t('profile.billingPeriod')}
                    value={`${periodStart ? new Date(periodStart).toLocaleDateString() : t('profile.na')} - ${periodEnd ? new Date(periodEnd).toLocaleDateString() : t('profile.na')}`}
                  />
                </View>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <Separator />
          <View style={{ paddingVertical: 8 }}>
            <Button
              variant="secondary"
              onPress={() => router.push("/(paywall)?variant=discount")}
              style={{ width: "100%" }}
            >
              <Button.Label>
                {hasActiveSubscription ? t('profile.managePlan') : t('profile.upgradePlan')}
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
          <SectionCard title={t('profile.weMissYou')}>
            <ProfileRow
              label={t('profile.previousPlan')}
              value={lastSubscription.productName || t('profile.unknown')}
              valueColor={planColor}
            />
            <Separator />
            <ProfileRow
              label={t('profile.status')}
              value={getStatusDisplay().text}
              valueColor={getStatusDisplay().color}
            />
            <Separator />
            <View style={{ paddingVertical: 8 }}>
              <Button
                variant="primary"
                onPress={() => router.push("/(paywall)?variant=discount")}
                style={{ width: "100%" }}
              >
                <Button.Label>{t('profile.comeBackAndCreate')}</Button.Label>
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
                {t('profile.enjoyingApp')}
              </Text>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <View style={{ gap: 12, paddingVertical: 8 }}>
                <Text style={{ color: muted, fontSize: 14, lineHeight: 20 }}>
                  {t('profile.enjoyingAppDescription')}
                </Text>
                <Button variant="secondary" onPress={handleRateApp}>
                  <Button.Label>{t('profile.rateOnPlayStore')}</Button.Label>
                </Button>
                <Button variant="ghost" onPress={handleSendFeedback}>
                  <Button.Label>{t('profile.sendFeedback')}</Button.Label>
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
                {t('profile.areYouArtist')}
              </Text>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <View style={{ gap: 12, paddingVertical: 8 }}>
                <Text style={{ color: muted, fontSize: 14, lineHeight: 20 }}>
                  {t('profile.artistDescription')}
                </Text>
                <Button variant="secondary" onPress={handleArtistContact}>
                  <Button.Label>{t('profile.writeToUs')}</Button.Label>
                </Button>
              </View>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </SectionCard>

      {/* Support & Feedback */}
      <SectionCard title={t('profile.supportAndFeedback')}>
        <ActionRow title={t('profile.rateApp')} icon="star-outline" onPress={handleRateApp} />
        <Separator />
        <ActionRow
          title={t('profile.shareWithFriends')}
          icon="share-outline"
          onPress={handleShareApp}
        />
        <Separator />
        <ActionRow
          title={t('profile.contactSupport')}
          icon="mail-outline"
          onPress={handleContactSupport}
        />
      </SectionCard>

      {/* Follow Us */}
      <SectionCard title={t('profile.followUs')}>
        <ActionRow
          title="fahimanwer.com"
          icon="globe-outline"
          onPress={() => Linking.openURL("https://fahimanwer.com")}
        />
        <Separator />
        <ActionRow
          title="Facebook"
          icon="logo-facebook"
          onPress={() => Linking.openURL("https://www.facebook.com/profile.php?id=61574104086111")}
        />
        <Separator />
        <ActionRow
          title="Instagram"
          icon="logo-instagram"
          onPress={() => Linking.openURL("https://www.instagram.com/thewe.cc/")}
        />
        <Separator />
        <ActionRow
          title="TikTok"
          icon="logo-tiktok"
          onPress={() => Linking.openURL("https://www.tiktok.com/")}
        />
      </SectionCard>

      {/* Settings */}
      <SectionCard
        title={t('profile.settings')}
        footer={`${t('profile.version')} ${Application.nativeApplicationVersion}`}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons name="contrast-outline" size={20} color={muted} />
            <Text style={{ color: fg, fontSize: 15 }}>{t('profile.appearance')}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {(["light", "dark", "system"] as ThemeMode[]).map((m) => (
              <Chip
                key={m}
                variant={themeMode === m ? "primary" : "secondary"}
                size="sm"
                onPress={() => setThemeMode(m)}
              >
                <Chip.Label
                  style={{
                    fontWeight: themeMode === m ? "600" : "400",
                  }}
                >
                  {t(`profile.${m}`)}
                </Chip.Label>
              </Chip>
            ))}
          </View>
        </View>
        <Separator />
        <Pressable onPress={() => setLanguageModalOpen(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="language-outline" size={20} color={muted} />
            <Text style={{ color: fg, fontSize: 15 }}>{t('profile.language')}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={{ color: muted, fontSize: 14 }}>
              {isAutoDetect ? t('profile.languageAuto') : currentLanguageName}
            </Text>
            <Ionicons name="chevron-forward" size={16} color={muted} />
          </View>
        </Pressable>
        <Separator />
        <SettingsToggleRow
          icon="refresh-outline"
          title={t('profile.showOnboarding')}
          isSelected={!settings.isOnboarded}
          onSelectedChange={() =>
            updateSettings({ isOnboarded: !(settings.isOnboarded ?? true) })
          }
        />
        <Separator />
        <SettingsToggleRow
          icon="sparkles-outline"
          title={t('profile.promptEnhancement')}
          isSelected={settings.improvePrompt}
          onSelectedChange={() => {
            const newValue = !settings.improvePrompt;
            updateSettings({ improvePrompt: newValue });
            if (!newValue) {
              Alert.alert(
                t('profile.promptEnhancementDisabledTitle'),
                t('profile.promptEnhancementDisabledMessage'),
                [{ text: t('common.ok') }]
              );
            }
          }}
        />
      </SectionCard>

      {/* Legal */}
      <SectionCard title={t('profile.legal')}>
        <ActionRow
          title={t('profile.privacyPolicy')}
          icon="shield-outline"
          onPress={handlePrivacyPolicy}
        />
        <Separator />
        <ActionRow
          title={t('profile.termsOfService')}
          icon="document-text-outline"
          onPress={handleTermsOfService}
        />
      </SectionCard>

      {/* Sign Out */}
      {isAuthenticated && (
        <Button variant="danger" onPress={handleSignOut} style={{ width: "100%" }}>
          <Button.Label>{t('profile.logOut')}</Button.Label>
        </Button>
      )}

      {/* Delete Account */}
      {isAuthenticated && (
        <SectionCard
          title={t('profile.dangerZone')}
          footer={t('profile.dangerZoneFooter')}
        >
          <View style={{ paddingVertical: 8 }}>
            <Button
              variant="danger-soft"
              onPress={handleDeleteAccount}
              style={{ width: "100%" }}
            >
              <Button.Label>{t('profile.deleteAccount')}</Button.Label>
            </Button>
          </View>
        </SectionCard>
      )}
      {/* Language Picker Modal */}
      <LanguagePickerModal
        isOpen={languageModalOpen}
        onOpenChange={setLanguageModalOpen}
        selectedLanguage={selectedLanguage}
        availableLanguages={availableLanguages}
        autoLanguageCode={AUTO_LANGUAGE}
        onSelectLanguage={handleLanguageChange}
      />
    </ScrollView>
  );
}
