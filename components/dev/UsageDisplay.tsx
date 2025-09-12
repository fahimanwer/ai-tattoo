import {
  useCurrentPeriodUsage,
  useHasActiveEntitlement,
  useUsage,
} from "@/hooks/useUsage";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function UsageDisplay() {
  const { data: usageData, isLoading, isError, error, refetch } = useUsage();

  const { data: proUsage, currentCount: proCount } =
    useCurrentPeriodUsage("pro");

  const { hasActiveEntitlement: hasActivePro } = useHasActiveEntitlement("pro");

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", padding: 20 }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading usage data...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          padding: 16,
          borderRadius: 8,
          borderLeftWidth: 4,
          borderLeftColor: "#c62828",
        }}
      >
        <Text
          style={{
            color: "#c62828",
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          ❌ Failed to Load Usage Data
        </Text>
        <Text style={{ color: "#c62828", fontSize: 14 }}>
          {error?.message || "Failed to fetch usage data"}
        </Text>
        <Button
          title="Retry"
          onPress={() => refetch()}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Usage Dashboard
      </Text>

      {/* Summary */}
      <View
        style={{
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
          Summary
        </Text>
        <Text>Total Usage: {usageData?.totalUsage || 0}</Text>
        <Text>Active Pro: {hasActivePro ? "Yes" : "No"}</Text>
        <Text>Current Pro Usage: {proCount}</Text>
      </View>

      {/* Current Period Usage */}
      {proUsage && (
        <View
          style={{
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Current Pro Period
          </Text>
          <Text>
            Period: {new Date(proUsage.periodStart).toLocaleDateString()} -{" "}
            {new Date(proUsage.periodEnd).toLocaleDateString()}
          </Text>
          <Text>Usage Count: {proUsage.count}</Text>
          <Text>RevenueCat User ID: {proUsage.revenuecatUserId}</Text>
        </View>
      )}

      {/* All Usage Records */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
        All Usage Records ({usageData?.usage.length || 0})
      </Text>

      {usageData?.usage.map((usage, index) => (
        <View
          key={`${usage.entitlement}-${usage.periodStart}`}
          style={{
            padding: 12,
            borderRadius: 6,
            marginBottom: 8,
            borderLeftWidth: 3,
            borderLeftColor:
              usage.entitlement === "pro" ? "#4caf50" : "#2196f3",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {usage.entitlement.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 12, color: "#666" }}>
            {new Date(usage.periodStart).toLocaleDateString()} -{" "}
            {new Date(usage.periodEnd).toLocaleDateString()}
          </Text>
          <Text>Usage: {usage.count}</Text>
          <Text style={{ fontSize: 12, color: "#666" }}>
            RC ID: {usage.revenuecatUserId}
          </Text>
        </View>
      ))}

      {(!usageData?.usage || usageData.usage.length === 0) && (
        <View
          style={{
            padding: 16,
            backgroundColor: "#ffe4c4",
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: "#ffc107",
          }}
        >
          <Text style={{ color: "#8b4513" }}>
            No usage records found. This could mean:
          </Text>
          <Text style={{ color: "#8b4513", marginTop: 4 }}>
            • User has no active subscriptions
          </Text>
          <Text style={{ color: "#8b4513" }}>
            • No RevenueCat webhook events have been processed yet
          </Text>
        </View>
      )}

      <Button
        title="Refresh Usage Data"
        onPress={() => refetch()}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
}
