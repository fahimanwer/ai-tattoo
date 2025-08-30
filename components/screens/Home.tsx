import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SwitchTheme } from "@/components/ui/SwitchTheme";
import { Text } from "@/components/ui/Text";
import { useAccentColor } from "@/hooks/useAccentColor";
import { ScrollView, StyleSheet, View } from "react-native";

export function Home() {
  const { getBackgroundColor } = useAccentColor();
  const backgroundColor = getBackgroundColor();

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor }]}>
        <View style={styles.subcontainer}>
          <View style={styles.section}>
            <Text type="subtitle" weight="bold">
              Theme
            </Text>
            <SwitchTheme />
          </View>

          <View style={styles.section}>
            <Text type="subtitle" weight="bold">
              Buttons
            </Text>
            <View style={styles.componentsContainer}>
              <Button variant="solid" title="Solid" onPress={() => {}} />
              <Button variant="outline" title="Outline" onPress={() => {}} />
              <Button variant="soft" title="Soft" onPress={() => {}} />
              <Button variant="subtle" title="Subtle" onPress={() => {}} />
              <Button variant="link" title="Link" onPress={() => {}} />
              <Button
                variant="solid"
                symbol="eye.fill"
                title="Symbol & Text"
                onPress={() => {}}
              />
              <Button variant="solid" symbol="eye.fill" onPress={() => {}} />
              <Button
                variant="solid"
                title="Disabled"
                disabled
                onPress={() => {}}
              />
              <Button
                variant="solid"
                title="Loading"
                loading
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text type="subtitle" weight="bold">
              Inputs
            </Text>
            <View style={styles.componentsContainer}>
              <Input variant="outline" placeholder="Outline" />
              <Input variant="soft" placeholder="Soft" />
              <Input variant="subtle" placeholder="Subtle" />
              <Input variant="underline" placeholder="Underline" />
            </View>
          </View>
          <View style={styles.section}>
            <Text type="subtitle" weight="bold">
              Typography
            </Text>
            <View style={styles.typographyContainer}>
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
                xl
              </Text>
              <Text type="lg" weight="bold">
                lg
              </Text>
              <Text type="sm" weight="bold">
                sm
              </Text>
              <Text type="xs" weight="bold">
                xs
              </Text>
              <Text type="base" weight="bold">
                base
              </Text>
              <Text type="default" weight="bold">
                default
              </Text>
              <Text type="title" weight="bold">
                Title
              </Text>
              <Text type="subtitle" weight="bold">
                Subtitle
              </Text>
              <Text type="body" weight="bold">
                Body
              </Text>
              <Text type="caption" weight="bold">
                Caption
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
    gap: 32,
  },
  section: {
    gap: 8,
  },
  componentsContainer: {
    gap: 16,
  },
  typographyContainer: {
    gap: 1,
  },
});
