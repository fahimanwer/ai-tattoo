import { Text } from "@/components/ui/Text";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

interface ItemStyleProps {
  tattoo: FeaturedTattoo;
  onPress: () => void;
  isSelected?: boolean;
}

export function ItemStyle({
  tattoo,
  onPress,
  isSelected = false,
}: ItemStyleProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.itemContainer, isSelected && styles.selectedContainer]}
      accessibilityLabel={`Select tattoo style: ${tattoo.title}`}
    >
      <Image
        source={tattoo.image ?? undefined}
        style={[styles.image, isSelected && styles.selectedImage]}
        accessibilityIgnoresInvertColors
        accessibilityLabel={`${tattoo.title} cover image`}
      />
      <Text
        weight="normal"
        type="xs"
        lightColor={isSelected ? "black" : "white"}
        darkColor={isSelected ? "black" : "white"}
      >
        {tattoo.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: "auto",
    paddingVertical: 4,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 99,
  },
  selectedContainer: {
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
  },
});
