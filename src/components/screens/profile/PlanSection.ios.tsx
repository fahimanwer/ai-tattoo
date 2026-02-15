import { Color } from "@/src/constants/TWPalette";
import {
  Button,
  DisclosureGroup,
  HStack,
  Label,
  LabeledContent,
  Section,
  Text,
} from "@expo/ui/swift-ui";
import {
  font,
  foregroundStyle,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { Activity, useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

interface PlanSectionProps {
  planBadge: { name: string; color: string; icon?: string };
  planColor: string;
  hasActiveSubscription: boolean;
  lastSubscription: any;
  remaining: number | undefined;
  periodStart: string | undefined;
  periodEnd: string | undefined;
  getStatusDisplay: () => { text: string; color: string };
  isRefreshing: boolean;
  handleRefresh: () => void;
}

function FormButton({
  title,
  systemImage,
  onPress,
  color = "white",
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
      modifiers={[foregroundStyle({ type: "color", color })]}
    >
      <Label title={title} systemImage={systemImage} />
    </Button>
  );
}

export function PlanSection({
  planBadge,
  planColor,
  hasActiveSubscription,
  lastSubscription,
  remaining,
  periodStart,
  periodEnd,
  getStatusDisplay,
  isRefreshing,
  handleRefresh,
}: PlanSectionProps) {
  const [isPlanDetailsExpanded, setIsPlanDetailsExpanded] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Section
      title={
        hasActiveSubscription
          ? lastSubscription?.unsubscribeDetectedAt
            ? t('profile.activeUntilExpiration')
            : t('profile.plan')
          : t('profile.activeUsagePeriod')
      }
      footer={
        <Activity mode={remaining === 0 ? "visible" : "hidden"}>
          <Text
            modifiers={[foregroundStyle({ type: "color", color: "orange" })]}
          >
            {t('profile.limitReachedFooterLong')}
          </Text>
        </Activity>
      }
    >
      <LabeledContent label={t('profile.plan')}>
        <HStack spacing={6}>
          <Label systemImage={planBadge.icon ?? "star"} />
          <Text
            modifiers={[
              foregroundStyle({ type: "color", color: planBadge.color }),
              font({ weight: "bold" }),
            ]}
          >
            {planBadge.name}
          </Text>
        </HStack>
      </LabeledContent>
      <FormButton
        title={hasActiveSubscription ? t('profile.managePlan') : t('profile.upgradePlan')}
        systemImage={hasActiveSubscription ? "creditcard.fill" : "star.fill"}
        onPress={() => router.push("/(paywall)?variant=discount")}
        color={hasActiveSubscription ? "white" : "#3563E9"}
      />
      <DisclosureGroup
        isExpanded={isPlanDetailsExpanded}
        onIsExpandedChange={setIsPlanDetailsExpanded}
        label={t('profile.planDetails')}
        modifiers={[tint("white")]}
      >
        <LabeledContent label={t('profile.plan')}>
          <Text
            modifiers={[
              font({ weight: "bold" }),
              foregroundStyle({ type: "color", color: planColor }),
            ]}
          >
            {hasActiveSubscription && lastSubscription
              ? lastSubscription.productName || t('profile.unknown')
              : t('profile.free')}
          </Text>
        </LabeledContent>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription ? "visible" : "hidden"
          }
        >
          <LabeledContent label={t('profile.status')}>
            <Text
              modifiers={[
                font({ weight: "bold" }),
                foregroundStyle({
                  type: "color",
                  color: getStatusDisplay().color,
                }),
              ]}
            >
              {lastSubscription?.unsubscribeDetectedAt
                ? t('profile.cancelledActiveUntilExpiration')
                : getStatusDisplay().text}
            </Text>
          </LabeledContent>
        </Activity>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription?.expiresDate
              ? "visible"
              : "hidden"
          }
        >
          <LabeledContent
            label={
              lastSubscription?.unsubscribeDetectedAt
                ? t('profile.accessEndsOn')
                : lastSubscription?.willRenew
                  ? t('profile.renewsOn')
                  : t('profile.expiresOn')
            }
          >
            <Text
              modifiers={[
                font({
                  weight: lastSubscription?.unsubscribeDetectedAt
                    ? "bold"
                    : "regular",
                }),
              ]}
            >
              {lastSubscription?.expiresDate
                ? new Date(lastSubscription.expiresDate).toLocaleDateString()
                : ""}
            </Text>
          </LabeledContent>
        </Activity>
        <Activity
          mode={
            hasActiveSubscription &&
            lastSubscription &&
            lastSubscription.daysRemaining !== null &&
            lastSubscription.daysRemaining > 0
              ? "visible"
              : "hidden"
          }
        >
          <LabeledContent label={t('profile.daysRemaining')}>
            <Text
              modifiers={[
                font({ weight: "bold" }),
                foregroundStyle({
                  type: "color",
                  color:
                    (lastSubscription?.daysRemaining ?? 0) <= 3
                      ? "#f59e0b"
                      : Color.green[500],
                }),
              ]}
            >
              {t('profile.daysValue', { count: lastSubscription?.daysRemaining ?? 0 })}
            </Text>
          </LabeledContent>
        </Activity>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription ? "visible" : "hidden"
          }
        >
          <LabeledContent label={t('profile.autoRenew')}>
            <Text
              modifiers={[
                foregroundStyle({
                  type: "color",
                  color: lastSubscription?.willRenew
                    ? Color.green[500]
                    : Color.red[500],
                }),
              ]}
            >
              {lastSubscription?.willRenew ? t('common.on') : t('common.off')}
            </Text>
          </LabeledContent>
        </Activity>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription?.unsubscribeDetectedAt
              ? "visible"
              : "hidden"
          }
        >
          <LabeledContent label={t('profile.cancelledAt')}>
            <Text
              modifiers={[
                font({ weight: "bold" }),
                foregroundStyle({ type: "color", color: "#f59e0b" }),
              ]}
            >
              {lastSubscription?.unsubscribeDetectedAt
                ? new Date(
                    lastSubscription.unsubscribeDetectedAt
                  ).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                : ""}
            </Text>
          </LabeledContent>
        </Activity>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription?.price
              ? "visible"
              : "hidden"
          }
        >
          <LabeledContent label={t('profile.price')}>
            <Text>
              {lastSubscription?.price
                ? `${lastSubscription.price.currency} $${lastSubscription.price.amount}`
                : ""}
            </Text>
          </LabeledContent>
        </Activity>
        <LabeledContent label={t('profile.billingPeriod')}>
          <Text>
            {`${
              periodStart
                ? new Date(periodStart).toLocaleDateString()
                : t('profile.na')
            } - ${
              periodEnd ? new Date(periodEnd).toLocaleDateString() : t('profile.na')
            }`}
          </Text>
        </LabeledContent>
      </DisclosureGroup>
    </Section>
  );
}

export function WeMissYouSection({
  planColor,
  lastSubscription,
  getStatusDisplay,
  isRefreshing,
  handleRefresh,
}: Pick<
  PlanSectionProps,
  "planColor" | "lastSubscription" | "getStatusDisplay" | "isRefreshing" | "handleRefresh"
>) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Section
      title={t('profile.weMissYou')}
      footer={
        <Text
          modifiers={[
            foregroundStyle({ type: "color", color: Color.zinc[400] }),
          ]}
        >
          {t('profile.weMissYouFooter')}
        </Text>
      }
    >
      <LabeledContent label={t('profile.previousPlan')}>
        <Text
          modifiers={[
            font({ weight: "bold" }),
            foregroundStyle({ type: "color", color: planColor }),
          ]}
        >
          {lastSubscription?.productName || t('profile.unknown')}
        </Text>
      </LabeledContent>
      <LabeledContent label={t('profile.status')}>
        <Text
          modifiers={[
            font({ weight: "bold" }),
            foregroundStyle({
              type: "color",
              color: getStatusDisplay().color,
            }),
          ]}
        >
          {getStatusDisplay().text}
        </Text>
      </LabeledContent>
      <Activity mode={lastSubscription?.expiresDate ? "visible" : "hidden"}>
        <LabeledContent label={t('profile.expiredOn')}>
          <Text>
            {lastSubscription?.expiresDate
              ? new Date(lastSubscription.expiresDate).toLocaleDateString()
              : ""}
          </Text>
        </LabeledContent>
      </Activity>
      <FormButton
        title={t('profile.comeBackAndCreate')}
        systemImage="sparkles"
        onPress={() => router.push("/(paywall)?variant=discount")}
        color="#3563E9"
      />
      <FormButton
        title={isRefreshing ? t('profile.refreshing') : t('profile.refreshData')}
        systemImage="arrow.clockwise"
        onPress={handleRefresh}
      />
    </Section>
  );
}
