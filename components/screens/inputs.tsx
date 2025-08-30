import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { useAccentColor } from "@/hooks/useAccentColor";
import { ScrollView, StyleSheet, View } from "react-native";

export function Inputs() {
  const { getBackgroundColor } = useAccentColor();
  const backgroundColor = getBackgroundColor();

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Red */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Red
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="red" variant="outline" />
          <Input placeholder="Soft" color="red" variant="soft" />
          <Input placeholder="Subtle" color="red" variant="subtle" />
          <Input placeholder="Underline" color="red" variant="underline" />
        </View>
      </View>
      {/* Orange */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Orange
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="orange" variant="outline" />
          <Input placeholder="Soft" color="orange" variant="soft" />
          <Input placeholder="Subtle" color="orange" variant="subtle" />
          <Input placeholder="Underline" color="orange" variant="underline" />
        </View>
      </View>
      {/* Amber */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Amber
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="amber" variant="outline" />
          <Input placeholder="Soft" color="amber" variant="soft" />
          <Input placeholder="Subtle" color="amber" variant="subtle" />
          <Input placeholder="Underline" color="amber" variant="underline" />
        </View>
      </View>
      {/* Yellow */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Yellow
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="yellow" variant="outline" />
          <Input placeholder="Soft" color="yellow" variant="soft" />
          <Input placeholder="Subtle" color="yellow" variant="subtle" />
          <Input placeholder="Underline" color="yellow" variant="underline" />
        </View>
      </View>
      {/* Lime */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Lime
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="lime" variant="outline" />
          <Input placeholder="Soft" color="lime" variant="soft" />
          <Input placeholder="Subtle" color="lime" variant="subtle" />
          <Input placeholder="Underline" color="lime" variant="underline" />
        </View>
      </View>
      {/* Green */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Green
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="green" variant="outline" />
          <Input placeholder="Soft" color="green" variant="soft" />
          <Input placeholder="Subtle" color="green" variant="subtle" />
          <Input placeholder="Underline" color="green" variant="underline" />
        </View>
      </View>
      {/* Emerald */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Emerald
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="emerald" variant="outline" />
          <Input placeholder="Soft" color="emerald" variant="soft" />
          <Input placeholder="Subtle" color="emerald" variant="subtle" />
          <Input placeholder="Underline" color="emerald" variant="underline" />
        </View>
      </View>
      {/* Teal */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Teal
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="teal" variant="outline" />
          <Input placeholder="Soft" color="teal" variant="soft" />
          <Input placeholder="Subtle" color="teal" variant="subtle" />
          <Input placeholder="Underline" color="teal" variant="underline" />
        </View>
      </View>
      {/* Cyan */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Cyan
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="cyan" variant="outline" />
          <Input placeholder="Soft" color="cyan" variant="soft" />
          <Input placeholder="Subtle" color="cyan" variant="subtle" />
          <Input placeholder="Underline" color="cyan" variant="underline" />
        </View>
      </View>
      {/* Sky */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Sky
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="sky" variant="outline" />
          <Input placeholder="Soft" color="sky" variant="soft" />
          <Input placeholder="Subtle" color="sky" variant="subtle" />
          <Input placeholder="Underline" color="sky" variant="underline" />
        </View>
      </View>
      {/* Blue */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Blue
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="blue" variant="outline" />
          <Input placeholder="Soft" color="blue" variant="soft" />
          <Input placeholder="Subtle" color="blue" variant="subtle" />
          <Input placeholder="Underline" color="blue" variant="underline" />
        </View>
      </View>
      {/* Indigo */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Indigo
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="indigo" variant="outline" />
          <Input placeholder="Soft" color="indigo" variant="soft" />
          <Input placeholder="Subtle" color="indigo" variant="subtle" />
          <Input placeholder="Underline" color="indigo" variant="underline" />
        </View>
      </View>
      {/* Violet */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Violet
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="violet" variant="outline" />
          <Input placeholder="Soft" color="violet" variant="soft" />
          <Input placeholder="Subtle" color="violet" variant="subtle" />
          <Input placeholder="Underline" color="violet" variant="underline" />
        </View>
      </View>
      {/* Purple */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Purple
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="purple" variant="outline" />
          <Input placeholder="Soft" color="purple" variant="soft" />
          <Input placeholder="Subtle" color="purple" variant="subtle" />
          <Input placeholder="Underline" color="purple" variant="underline" />
        </View>
      </View>
      {/* Pink */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Pink
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="pink" variant="outline" />
          <Input placeholder="Soft" color="pink" variant="soft" />
          <Input placeholder="Subtle" color="pink" variant="subtle" />
          <Input placeholder="Underline" color="pink" variant="underline" />
        </View>
      </View>
      {/* Rose */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Rose
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="rose" variant="outline" />
          <Input placeholder="Soft" color="rose" variant="soft" />
          <Input placeholder="Subtle" color="rose" variant="subtle" />
          <Input placeholder="Underline" color="rose" variant="underline" />
        </View>
      </View>
      {/* Neutral */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Neutral
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="neutral" variant="outline" />
          <Input placeholder="Soft" color="neutral" variant="soft" />
          <Input placeholder="Subtle" color="neutral" variant="subtle" />
          <Input placeholder="Underline" color="neutral" variant="underline" />
        </View>
      </View>
      {/* Slate */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Slate
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="slate" variant="outline" />
          <Input placeholder="Soft" color="slate" variant="soft" />
          <Input placeholder="Subtle" color="slate" variant="subtle" />
          <Input placeholder="Underline" color="slate" variant="underline" />
        </View>
      </View>
      {/* Gray */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Gray
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="gray" variant="outline" />
          <Input placeholder="Soft" color="gray" variant="soft" />
          <Input placeholder="Subtle" color="gray" variant="subtle" />
          <Input placeholder="Underline" color="gray" variant="underline" />
        </View>
      </View>
      {/* Zinc */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Zinc
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="zinc" variant="outline" />
          <Input placeholder="Soft" color="zinc" variant="soft" />
          <Input placeholder="Subtle" color="zinc" variant="subtle" />
          <Input placeholder="Underline" color="zinc" variant="underline" />
        </View>
      </View>
      {/* Stone */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Stone
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="stone" variant="outline" />
          <Input placeholder="Soft" color="stone" variant="soft" />
          <Input placeholder="Subtle" color="stone" variant="subtle" />
          <Input placeholder="Underline" color="stone" variant="underline" />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Full White (View in dark mode)
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="white" variant="outline" />
          <Input placeholder="Soft" color="white" variant="soft" />
          <Input placeholder="Subtle" color="white" variant="subtle" />
          <Input placeholder="Underline" color="white" variant="underline" />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Full Black (View in light mode)
        </Text>
        <View style={styles.inputsContainer}>
          <Input placeholder="Outline" color="black" variant="outline" />
          <Input placeholder="Soft" color="black" variant="soft" />
          <Input placeholder="Subtle" color="black" variant="subtle" />
          <Input placeholder="Underline" color="black" variant="underline" />
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
  inputsContainer: {
    gap: 16,
    flex: 1,
    width: "100%",
    margin: "auto",
    marginTop: 12,
  },
});
