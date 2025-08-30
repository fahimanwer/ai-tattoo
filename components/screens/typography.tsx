import { Text } from "@/components/ui/Text";
import { useAccentColor } from "@/hooks/useAccentColor";
import { ScrollView, StyleSheet, View } from "react-native";

export function Typography() {
  const { getBackgroundColor } = useAccentColor();
  const backgroundColor = getBackgroundColor();

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Typography */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Typography
        </Text>
        <View style={styles.typographyContainer}>
          <Text type="12xl" weight="bold">
            12xl
          </Text>
          <Text type="11xl" weight="bold">
            11xl
          </Text>
          <Text type="10xl" weight="bold">
            10xl
          </Text>
          <Text type="9xl" weight="bold">
            9xl
          </Text>
          <Text type="8xl" weight="bold">
            8xl
          </Text>
          <Text type="7xl" weight="bold">
            7xl
          </Text>
          <Text type="6xl" weight="bold">
            6xl
          </Text>
          <Text type="5xl" weight="bold">
            5xl
          </Text>
          <Text type="4xl" weight="bold">
            4xl
          </Text>
          <Text type="3xl" weight="bold">
            3xl
          </Text>
          <Text type="2xl" weight="bold">
            2xl
          </Text>
          <Text type="xl" weight="bold">
            1xl
          </Text>
          <Text type="lg" weight="bold">
            lg
          </Text>
          <Text type="default" weight="bold">
            md
          </Text>
          <Text type="sm" weight="bold">
            sm
          </Text>
          <Text type="xs" weight="bold">
            xs
          </Text>
          <Text type="default" weight="bold">
            default
          </Text>
          <Text type="base" weight="bold">
            base
          </Text>
          <Text type="title" weight="bold">
            title
          </Text>
          <Text type="subtitle" weight="bold">
            subtitle
          </Text>
          <Text type="body" weight="bold">
            body
          </Text>
          <Text type="caption" weight="bold">
            caption
          </Text>
          <Text type="link" weight="bold">
            link
          </Text>
        </View>
      </View>
      {/* Weights */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="black">
          Weights
        </Text>
        <View style={styles.typographyContainer}>
          <Text type="title" weight="black">
            Black
          </Text>
          <Text type="title" weight="heavy">
            Heavy
          </Text>
          <Text type="title" weight="bold">
            Bold
          </Text>
          <Text type="title" weight="semibold">
            Semibold
          </Text>
          <Text type="title" weight="medium">
            Medium
          </Text>
          <Text type="title" weight="normal">
            Normal
          </Text>
          <Text type="title" weight="light">
            Light
          </Text>
          <Text type="title" weight="thin">
            Thin
          </Text>
          <Text type="title" weight="ultralight">
            Ultralight
          </Text>
        </View>
      </View>
      {/* Font Variants */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Font Variants
        </Text>
        <View style={styles.typographyContainer}>
          <Text type="title" weight="bold">
            System Font - Default Style
          </Text>
          <Text type="default">
            This is the default system font. Clean, readable, and follows the
            device&apos;s font preferences.
          </Text>

          <Text type="lg" weight="light">
            System Font Light
          </Text>
          <Text type="lg" weight="normal">
            System Font Normal
          </Text>
          <Text type="lg" weight="medium">
            System Font Medium
          </Text>
          <Text type="lg" weight="semibold">
            System Font Semibold
          </Text>
          <Text type="lg" weight="bold">
            System Font Bold
          </Text>
          <Text type="lg" weight="black">
            System Font Black
          </Text>

          <Text type="title" weight="bold" variant="poster">
            Poster Variant - Oswald Font
          </Text>
          <Text type="default" variant="poster">
            Perfect for headlines, banners, and bold statements. Strong,
            condensed, and impactful.
          </Text>

          <Text type="title" weight="bold" variant="serif">
            Serif Variant - Bodoni Moda
          </Text>
          <Text type="default" variant="serif">
            Elegant and sophisticated serif typeface, ideal for editorial
            content and refined typography.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 48,
  },
  typographyContainer: {
    gap: 16,
    flex: 1,
    width: "100%",
    margin: "auto",
    marginTop: 12,
  },
});
