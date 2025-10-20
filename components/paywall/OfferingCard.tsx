import { Color } from "@/constants/TWPalette";
import { entitlementToTier, getPlanConfig } from "@/constants/plan-limits";
import { useState } from "react";
import { View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

type OfferingCardProps = {
  title: string;
  package: PurchasesPackage;
  onPurchase?: (pkg: PurchasesPackage) => Promise<void>;
  isCurrentPlan?: boolean;
  disabled?: boolean;
};

export function OfferingCard({
  title,
  package: pkg,
  onPurchase,
  isCurrentPlan = false,
  disabled = false,
}: OfferingCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (disabled || isCurrentPlan || !onPurchase) return;

    try {
      setIsPurchasing(true);
      await onPurchase(pkg);
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const product = pkg.product;
  const buttonDisabled = disabled || isCurrentPlan || isPurchasing;

  // Get plan configuration based on the offering title
  const tier = entitlementToTier(title);
  const planConfig = getPlanConfig(tier);

  return (
    <View
      style={{
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: isCurrentPlan ? Color.green[500] : Color.zinc[800],
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text type="2xl">{planConfig.displayName}</Text>
          {isCurrentPlan && (
            <View
              style={{
                backgroundColor: Color.green[500],
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
              >
                CURRENT
              </Text>
            </View>
          )}
        </View>
        <Text type="2xl">{product.priceString} / Month</Text>
      </View>
      <Text style={{ marginBottom: 16, fontSize: 16, color: Color.zinc[400] }}>
        {planConfig.monthlyLimit.toLocaleString()} Tattoo Generations per month
      </Text>

      {/* Features list */}
      <View style={{ marginBottom: 16 }}>
        {planConfig.features.map((feature, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 14, color: Color.zinc[400] }}>
              • {feature}
            </Text>
          </View>
        ))}
      </View>

      <Button
        title={isCurrentPlan ? "Current Plan" : "Select Plan"}
        onPress={handlePurchase}
        disabled={buttonDisabled}
        color={tier === "pro" ? "orange" : "white"}
        variant="solid"
      />
    </View>
  );
}
