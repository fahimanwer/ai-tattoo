import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SelectStyle } from "./SelectStyle";

export function Container() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
        }}
      >
        <SelectStyle />
      </View>
    </SafeAreaView>
  );
}
