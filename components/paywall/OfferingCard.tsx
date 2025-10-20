import { Color } from "@/constants/TWPalette";
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
          <Text type="2xl">{title}</Text>
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
      <Text style={{ marginBottom: 16, fontSize: 16 }}>
        {product.title === "Starter"
          ? "125"
          : product.title === "Plus"
          ? "300"
          : "1,000"}{" "}
        Tattoo Generations
      </Text>
      <Button
        title={isCurrentPlan ? "Current Plan" : "Select Plan"}
        onPress={handlePurchase}
        disabled={buttonDisabled}
        color={product.title === "Pro" ? "orange" : "white"}
        variant="solid"
      />
      {/* <Text style={{ marginBottom: 4, color: Color.zinc[600] }}>
        Per Month: {product.pricePerMonthString}
      </Text>

      <Text style={{ marginBottom: 4, color: Color.zinc[600] }}>
        Per Week: {product.pricePerWeekString}
      </Text>

      <Text style={{ marginBottom: 8, color: Color.zinc[600] }}>
        Per Year: {product.pricePerYearString}
      </Text>

      <Text style={{ marginBottom: 4, fontSize: 10, color: Color.zinc[600] }}>
        Product ID: {product.identifier}
      </Text>

      <Text style={{ fontSize: 10, color: Color.zinc[600], marginBottom: 12 }}>
        Period: {product.subscriptionPeriod}
      </Text> */}
    </View>
  );
}
