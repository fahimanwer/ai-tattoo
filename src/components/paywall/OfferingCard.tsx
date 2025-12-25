import { Color } from "@/src/constants/TWPalette";
import { PressableScale } from "pressto";
import { Activity, useState } from "react";
import { View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

type OfferingCardProps = {
  title: string;
  package: PurchasesPackage;
  onPress?: () => void;
  isCurrentPlan?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
};

export function OfferingCard({
  title,
  package: pkg,
  onPress,
  isCurrentPlan = false,
  disabled = false,
  isSelected = false,
}: OfferingCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePress = async () => {
    if (disabled || isCurrentPlan || !onPress || isPurchasing) return;

    try {
      setIsPurchasing(true);
      onPress();
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const product = pkg.product;

  return (
    <PressableScale
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: isSelected ? "white" : Color.grayscale[100],
        borderRadius: 18,
        backgroundColor: isSelected ? Color.grayscale[100] : "black",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Icon
          symbol={isSelected ? "checkmark.circle.fill" : "circle.fill"}
          size="lg"
          color={isSelected ? "white" : Color.grayscale[700]}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <View style={{ flexDirection: "column", gap: 4 }}>
            <Text weight="bold">{title}</Text>
            <Text
              weight="medium"
              type="base"
              style={{ color: Color.grayscale[400] }}
            >
              {product.priceString.replace(/\s/g, "")}/Month
            </Text>
          </View>
        </View>
      </View>

      {/* Weekly price */}
      <Text type="sm">
        {product.pricePerWeekString?.replace(/\s/g, "")}/Week
      </Text>

      <Activity mode={isCurrentPlan ? "visible" : "hidden"}>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "yellow",
            paddingHorizontal: 8,
            borderRadius: 8,
          }}
        >
          <Text weight="bold" style={{ color: "black", fontSize: 12 }}>
            CURRENT
          </Text>
        </View>
      </Activity>
    </PressableScale>
  );
}
