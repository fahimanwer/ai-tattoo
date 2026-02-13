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

  return (
    <Section
      title={
        hasActiveSubscription
          ? lastSubscription?.unsubscribeDetectedAt
            ? "Active Until Expiration"
            : "Plan"
          : "Active Usage Period"
      }
      footer={
        <Activity mode={remaining === 0 ? "visible" : "hidden"}>
          <Text
            modifiers={[foregroundStyle({ type: "color", color: "orange" })]}
          >
            You&apos;ve reached your AI tattoo generation limit for this plan.
            Upgrade to continue creating tattoos or contact us.
          </Text>
        </Activity>
      }
    >
      <LabeledContent label="Plan">
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
        title={hasActiveSubscription ? "Manage Plan" : "Upgrade Plan"}
        systemImage={hasActiveSubscription ? "creditcard.fill" : "star.fill"}
        onPress={() => router.push("/(paywall)")}
        color={hasActiveSubscription ? "white" : "#3563E9"}
      />
      <DisclosureGroup
        isExpanded={isPlanDetailsExpanded}
        onIsExpandedChange={setIsPlanDetailsExpanded}
        label="Plan Details"
        modifiers={[tint("white")]}
      >
        <LabeledContent label="Plan">
          <Text
            modifiers={[
              font({ weight: "bold" }),
              foregroundStyle({ type: "color", color: planColor }),
            ]}
          >
            {hasActiveSubscription && lastSubscription
              ? lastSubscription.productName || "Unknown"
              : "Free"}
          </Text>
        </LabeledContent>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription ? "visible" : "hidden"
          }
        >
          <LabeledContent label="Status">
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
                ? "Cancelled (Active Until Expiration)"
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
                ? "Access Ends On"
                : lastSubscription?.willRenew
                  ? "Renews On"
                  : "Expires On"
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
          <LabeledContent label="Days Remaining">
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
              {`${lastSubscription?.daysRemaining ?? 0} days`}
            </Text>
          </LabeledContent>
        </Activity>
        <Activity
          mode={
            hasActiveSubscription && lastSubscription ? "visible" : "hidden"
          }
        >
          <LabeledContent label="Auto-Renew">
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
              {lastSubscription?.willRenew ? "On" : "Off"}
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
          <LabeledContent label="Cancelled At">
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
          <LabeledContent label="Price">
            <Text>
              {lastSubscription?.price
                ? `${lastSubscription.price.currency} $${lastSubscription.price.amount}`
                : ""}
            </Text>
          </LabeledContent>
        </Activity>
        <LabeledContent label="Billing Period">
          <Text>
            {`${
              periodStart
                ? new Date(periodStart).toLocaleDateString()
                : "N/A"
            } - ${
              periodEnd ? new Date(periodEnd).toLocaleDateString() : "N/A"
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

  return (
    <Section
      title="We Miss You!"
      footer={
        <Text
          modifiers={[
            foregroundStyle({ type: "color", color: Color.zinc[400] }),
          ]}
        >
          {
            "Ready to create more amazing tattoos? Come back and let's design something incredible together."
          }
        </Text>
      }
    >
      <LabeledContent label="Previous Plan">
        <Text
          modifiers={[
            font({ weight: "bold" }),
            foregroundStyle({ type: "color", color: planColor }),
          ]}
        >
          {lastSubscription?.productName || "Unknown"}
        </Text>
      </LabeledContent>
      <LabeledContent label="Status">
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
        <LabeledContent label="Expired On">
          <Text>
            {lastSubscription?.expiresDate
              ? new Date(lastSubscription.expiresDate).toLocaleDateString()
              : ""}
          </Text>
        </LabeledContent>
      </Activity>
      <FormButton
        title="Come Back & Create"
        systemImage="sparkles"
        onPress={() => router.push("/(paywall)")}
        color="#3563E9"
      />
      <FormButton
        title={isRefreshing ? "Refreshing..." : "Refresh data"}
        systemImage="arrow.clockwise"
        onPress={handleRefresh}
      />
    </Section>
  );
}
