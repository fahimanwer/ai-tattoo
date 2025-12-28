import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

type SliderHandleProps = {
  size: number;
};

export function SliderHandle({ size }: SliderHandleProps) {
  return (
    <View
      style={[
        styles.handle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="unfold-more-vertical"
        size={24}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  handle: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
