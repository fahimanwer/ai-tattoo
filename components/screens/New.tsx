import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { type ColorOption, useTattooCreation } from "@/context/TattooCreationContext";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export function New() {
  const { 
    options, 
    updateOptions, 
    setCurrentStep,
    nextStep 
  } = useTattooCreation();
  
  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select a tattoo
        </Text>
        <Text type="body">Select a tattoo to try on</Text>
      </View>
      <ScrollView
        horizontal
        style={{ flex: 1, height: 200, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        {featuredTattoos.map((tattoo) => (
          <Pressable 
            key={tattoo.id} 
            onPress={() => updateOptions({ selectedTattoo: tattoo })}
          >
            <Image
              key={tattoo.id}
              source={tattoo.image}
              style={{
                width: 160,
                height: 160,
                borderWidth: 3.5,
                marginLeft: 8,
                borderRadius: 16,
                borderColor:
                  options.selectedTattoo?.id === tattoo.id
                    ? Color.orange[400]
                    : "transparent",
              }}
              contentFit="contain"
            />
            <Text
              type="body"
              weight="bold"
              style={{ textAlign: "center", marginTop: 8 }}
            >
              {tattoo.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Choose style
        </Text>
        <Text type="body">Select color preference for your tattoo</Text>

        <View style={styles.colorOptions}>
          <Button
            title="Color"
            variant={options.colorOption === "color" ? "solid" : "outline"}
            color={options.colorOption === "color" ? "orange" : "gray"}
            onPress={() => updateOptions({ colorOption: "color" })}
            style={styles.colorButton}
          />

          <Button
            title="Black & White"
            variant={options.colorOption === "blackwhite" ? "solid" : "outline"}
            color={options.colorOption === "blackwhite" ? "orange" : "gray"}
            onPress={() => updateOptions({ colorOption: "blackwhite" })}
            style={styles.colorButton}
          />
        </View>
      </View>

      <View style={[styles.section, { marginTop: 32 }]}>
        <Link href="/home/choose-photo" asChild>
          <Button
            symbol="arrow.right"
            variant="solid"
            haptic
            color="orange"
            title="Continue"
            disabled={!options.selectedTattoo || !options.colorOption}
            onPress={() => {
              nextStep();
            }}
          />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
    paddingHorizontal: 16,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  colorButton: {
    width: "48%",
  },
});
