import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useAccentColor } from "@/hooks/useAccentColor";
import { ScrollView, StyleSheet, View } from "react-native";

export function Buttons() {
  const { getBackgroundColor } = useAccentColor();
  const backgroundColor = getBackgroundColor();

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Alert */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Alert
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            title="Press to show alert"
            confirmationAlert={{
              title: "Action to be confirmed",
              message:
                "This action cannot be undone. Are you sure you want to continue?",
              confirmText: "Yes",
              cancelText: "No",
              onCancel: () => {
                console.log("Canceled");
              },
              onConfirm: () => {
                console.log("Confirmed");
              },
            }}
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Sizes */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Sizes
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            color="blue"
            title="Extra Small"
            size="xs"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Small"
            size="sm"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Default"
            size="md"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Large"
            size="lg"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Extra Large"
            size="xl"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Extra Extra Large"
            size="2xl"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Radius */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Radius
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            color="blue"
            title="None"
            radius="none"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="XXS"
            radius="xxs"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="XS"
            radius="xs"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="SM"
            radius="sm"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="MD"
            radius="md"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="LG"
            radius="lg"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="XL"
            radius="xl"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* With Icon */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          With Icon
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            color="blue"
            title="Plus"
            symbol="plus"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Minus"
            symbol="minus"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Gear"
            symbol="gear"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Only Icon */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Only Icon
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            color="blue"
            symbol="plus"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            symbol="minus"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            symbol="gear"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* States */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          States
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            color="blue"
            title="Loading"
            loading={true}
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Disabled"
            disabled={true}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Haptics */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Haptics
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="solid"
            color="green"
            title="Light Haptic"
            haptic={true}
            hapticStyle="light"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="orange"
            title="Medium Haptic"
            haptic={true}
            hapticStyle="medium"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="red"
            title="Heavy Haptic"
            haptic={true}
            hapticStyle="heavy"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="blue"
            title="No Haptic"
            haptic={false}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Red */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Red
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="red"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="red" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="red"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="red"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="red"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="red" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Orange */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Orange
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="orange"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="orange"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="orange"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="orange"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="orange"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="orange"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Amber */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Amber
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="amber"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="amber"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="amber"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="amber"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="amber"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="amber"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Yellow */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Yellow
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="yellow"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="yellow"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="yellow"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="yellow"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="yellow"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="yellow"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Lime */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Lime
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="lime"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="lime" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="lime"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="lime"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="lime"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="lime" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Green */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Green
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="green"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="green"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="green"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="green"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="green"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="green"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Emerald */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Emerald
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="emerald"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="emerald"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="emerald"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="emerald"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="emerald"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="emerald"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Teal */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Teal
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="teal"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="teal" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="teal"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="teal"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="teal"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="teal" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Cyan */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Cyan
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="cyan"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="cyan" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="cyan"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="cyan"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="cyan"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="cyan" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Sky */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Sky
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="sky"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="sky" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="sky"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="sky"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="sky"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="sky" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Blue */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Blue
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="blue"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="blue" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="blue"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="blue"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="blue"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="blue" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Indigo */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Indigo
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="indigo"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="indigo"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="indigo"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="indigo"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="indigo"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="indigo"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Violet */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Violet
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="violet"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="violet"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="violet"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="violet"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="violet"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="violet"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Purple */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Purple
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="purple"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="purple"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="purple"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="purple"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="purple"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="purple"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Pink */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Pink
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="pink"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="pink" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="pink"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="pink"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="pink"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="pink" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Rose */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Rose
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="rose"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="rose" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="rose"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="rose"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="rose"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="rose" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Neutral */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Neutral
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="neutral"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="neutral"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="neutral"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="neutral"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="neutral"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="neutral"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Slate */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Slate
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="slate"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="slate"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="slate"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="slate"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="slate"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="slate"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Gray */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Gray
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="gray"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="gray" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="gray"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="gray"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="gray"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="gray" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Zinc */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Zinc
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="zinc"
            title="Outline"
            onPress={() => {}}
          />
          <Button variant="soft" color="zinc" title="Soft" onPress={() => {}} />
          <Button
            variant="subtle"
            color="zinc"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="zinc"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="zinc"
            title="Solid"
            onPress={() => {}}
          />
          <Button variant="link" color="zinc" title="Link" onPress={() => {}} />
        </View>
      </View>
      {/* Stone */}
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Stone
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="stone"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="stone"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="stone"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="stone"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="stone"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="stone"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Full White (View in dark mode)
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="white"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="white"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="white"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="white"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="white"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="white"
            title="Link"
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Text type="subtitle" weight="bold">
          Full Black (View in light mode)
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            color="black"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="soft"
            color="black"
            title="Soft"
            onPress={() => {}}
          />
          <Button
            variant="subtle"
            color="black"
            title="Subtle"
            onPress={() => {}}
          />
          <Button
            variant="outline"
            color="black"
            title="Outline"
            onPress={() => {}}
          />
          <Button
            variant="solid"
            color="black"
            title="Solid"
            onPress={() => {}}
          />
          <Button
            variant="link"
            color="black"
            title="Link"
            onPress={() => {}}
          />
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
  buttonsContainer: {
    gap: 16,
    flex: 1,
    width: "100%",
    margin: "auto",
    marginTop: 12,
  },
});
