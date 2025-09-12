import { Host, Picker } from "@expo/ui/swift-ui";
import { useState } from "react";
import { ScrollView } from "react-native";
import { TextAndImageToImage } from "../dev/TextAndImageToImage";
import { TextToImage } from "../dev/TextToImage";
import { UsageDisplay } from "../dev/UsageDisplay";

export function Dev() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      {/* Warning: IOS only, this won't work on web or android*/}
      <Host style={{ height: 200 }}>
        <Picker
          options={[
            "Text to Image",
            "Text and Image to Image",
            "Usage Display",
          ]}
          selectedIndex={selectedIndex}
          onOptionSelected={({ nativeEvent: { index } }) => {
            setSelectedIndex(index);
          }}
          variant="segmented"
        />
      </Host>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {selectedIndex === 0 && <TextToImage />}
        {selectedIndex === 1 && <TextAndImageToImage />}
        {selectedIndex === 2 && <UsageDisplay />}
      </ScrollView>
    </>
  );
}
