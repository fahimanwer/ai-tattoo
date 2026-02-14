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
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import { useProfileData } from "./profile/useProfileData";
import { PlanSection, WeMissYouSection } from "./profile/PlanSection.ios";
import { useLanguage, AUTO_LANGUAGE } from "@/src/hooks/useLanguage";

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
  const { t } = useTranslation();
  const {
    selectedLanguage,
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

  const [isSecretExpanded, setIsSecretExpanded] = useState(false);
  const [isArtistExpanded, setIsArtistExpanded] = useState(false);
  const { mode: themeMode, setMode: setThemeMode, isDark } = useTheme();

  return (
    <Host style={{ flex: 1 }}>
      <Form modifiers={[refreshable(handleRefresh)]}>
        {/* Sign-in prompt */}
        <Activity mode={isAuthenticated ? "hidden" : "visible"}>
          <Section>
            <VStack>
              <ContentUnavailableView
                title={t('profile.notSignedIn')}
                description={t('profile.signInPrompt')}
                systemImage="person.crop.circle.badge.exclamationmark"
              />
              <Button
                label={t('auth.signIn')}
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
            title={t('profile.account')}
            footer={
              <Text
                modifiers={[
                  onTapGesture(async () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    await Clipboard.setStringAsync(user?.id ?? "");
                    toast.success(t('profile.userId') + " copied");
                  }),
                ]}
              >{`${t('profile.userId')}: ${user?.id}`}</Text>
            }
          >
            <LabeledContent label={t('profile.name')}>
              <Text>{displayName}</Text>
            </LabeledContent>
            <LabeledContent label={t('profile.email')}>
              <Text>{user?.email ?? ""}</Text>
            </LabeledContent>
            <LabeledContent label={t('profile.model')}>
              <Text>{modelDisplayName}</Text>
            </LabeledContent>
            <Activity mode={memberSince ? "visible" : "hidden"}>
              <LabeledContent label={t('profile.memberSince')}>
                <Text
                  modifiers={[
                    foregroundStyle({ type: "color", color: isDark ? Color.zinc[400] : Color.zinc[500] }),
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
                  foregroundStyle({ type: "color", color: isDark ? Color.zinc[400] : Color.zinc[500] }),
                ]}
              >
                {t('profile.enjoyingAppDescription')}
              </Text>
            ) : null
          }
        >
          <DisclosureGroup
            isExpanded={isSecretExpanded}
            onIsExpandedChange={setIsSecretExpanded}
            label={t('profile.enjoyingApp')}
            modifiers={[tint("#3563E9")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: isDark ? Color.zinc[400] : Color.zinc[500] }),
                ]}
              >
                {t('profile.enjoyingAppDescription')}
              </Text>
            </VStack>
            <FormButton
              title={t('profile.rateOnAppStore')}
              systemImage="star.fill"
              onPress={handleRateApp}
              color={"#3563E9"}
            />
            <FormButton
              title={t('profile.sendFeedback')}
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
            label={t('profile.areYouArtist')}
            modifiers={[tint("#3563E9")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: isDark ? Color.zinc[300] : Color.zinc[600] }),
                ]}
              >
                {t('profile.artistDescription')}
              </Text>
            </VStack>
            <FormButton
              title={t('profile.writeToUs')}
              systemImage="envelope.fill"
              onPress={handleArtistContact}
              color={Color.blue[500]}
            />
          </DisclosureGroup>
        </Section>

        {/* Support & Feedback */}
        <Section title={t('profile.supportAndFeedback')}>
          <FormButton title={t('profile.rateApp')} systemImage="star.fill" onPress={handleRateApp} />
          <FormButton title={t('profile.shareWithFriends')} systemImage="square.and.arrow.up.fill" onPress={handleShareApp} />
          <FormButton title={t('profile.contactSupport')} systemImage="envelope.fill" onPress={handleContactSupport} />
        </Section>

        {/* Follow Us */}
        <Section title={t('profile.followUs')}>
          <FormButton title="fahimanwer.com" systemImage="globe" onPress={() => Linking.openURL("https://fahimanwer.com")} />
          <FormButton title="Facebook" systemImage="person.2.fill" onPress={() => Linking.openURL("https://www.facebook.com/profile.php?id=61574104086111")} />
          <FormButton title="Instagram" systemImage="camera.fill" onPress={() => Linking.openURL("https://www.instagram.com/thewe.cc/")} />
          <FormButton title="TikTok" systemImage="video.fill" onPress={() => Linking.openURL("https://www.tiktok.com/")} />
        </Section>

        {/* Settings */}
        <Section
          title={t('profile.settings')}
          footer={
            <Text modifiers={[foregroundStyle({ type: "color", color: Color.zinc[500] })]}>
              {`${t('profile.version')} ${Application.nativeApplicationVersion}`}
            </Text>
          }
        >
          <Picker
            label={t('profile.appearance')}
            selection={themeMode}
            onSelectionChange={(v) => setThemeMode(v as ThemeMode)}
            modifiers={[pickerStyle("segmented")]}
          >
            <Text modifiers={[tag("light")]}>{t('profile.light')}</Text>
            <Text modifiers={[tag("dark")]}>{t('profile.dark')}</Text>
            <Text modifiers={[tag("system")]}>{t('profile.system')}</Text>
          </Picker>
          <Picker
            label={t('profile.language')}
            selection={selectedLanguage}
            onSelectionChange={(v) => handleLanguageChange(v as string)}
            modifiers={[pickerStyle("menu")]}
          >
            <Text modifiers={[tag(AUTO_LANGUAGE)]}>{t('profile.languageAuto')}</Text>
            {availableLanguages.map((lang) => (
              <Text key={lang.code} modifiers={[tag(lang.code)]}>
                {lang.nativeName}
              </Text>
            ))}
          </Picker>
          <LabeledContent label={t('profile.showOnboarding')}>
            <Toggle
              isOn={!settings.isOnboarded}
              onIsOnChange={() => updateSettings({ isOnboarded: !(settings.isOnboarded ?? true) })}
            />
          </LabeledContent>
          <LabeledContent label={t('profile.promptEnhancement')}>
            <Toggle
              isOn={settings.improvePrompt}
              onIsOnChange={() => {
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
          </LabeledContent>
        </Section>

        {/* Legal */}
        <Section title={t('profile.legal')}>
          <FormButton title={t('profile.privacyPolicy')} systemImage="hand.raised.fill" onPress={handlePrivacyPolicy} />
          <FormButton title={t('profile.termsOfService')} systemImage="doc.text.fill" onPress={handleTermsOfService} />
        </Section>

        {/* Log out */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section>
            <FormButton title={t('profile.logOut')} systemImage="rectangle.portrait.and.arrow.right.fill" onPress={handleSignOut} />
          </Section>
        </Activity>

        {/* Danger Zone */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section
            title={t('profile.dangerZone')}
            footer={
              <Text>
                {t('profile.dangerZoneFooter')}
              </Text>
            }
          >
            <FormButton
              title={t('profile.deleteAccount')}
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
