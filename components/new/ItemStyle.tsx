import { Text } from "@/components/ui/Text";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";
import { Icon } from "../ui/Icon";

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
      style={styles.itemContainer}
      accessibilityLabel={`Select tattoo style: ${tattoo.title}`}
    >
      {isSelected && (
        <Icon symbol="checkmark" style={styles.checkmarkIcon} color="white" />
      )}
      <Image
        source={tattoo.image ?? undefined}
        style={[styles.image, isSelected && styles.selectedImage]}
        placeholder={{
          blurhash:
            typeof tattoo.image === "object" && "blurhash" in tattoo.image
              ? tattoo.image.blurhash
              : undefined,
        }}
        accessibilityIgnoresInvertColors
        accessibilityLabel={`${tattoo.title} cover image`}
      />
      <Text weight="normal" type="xs" lightColor="white" darkColor="white">
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
    position: "relative",
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 99,
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: "white",
  },
  checkmarkIcon: {
    position: "absolute",
    top: 16,
    width: 16,
    height: 16,
    zIndex: 10,
  },
});
