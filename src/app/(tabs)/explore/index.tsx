import { ExploreScreen } from "@/src/components/screens/explore";
import { ExploreFilterProvider, useExploreFilter } from "@/src/context/ExploreFilterContext";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";

function ExploreContent() {
  const { filterMode, setFilterMode, handleBodyPartReset } = useExploreFilter();

  const handleFilterModeChange = (mode: "body part" | "styles") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFilterMode(mode);
    handleBodyPartReset();
  };

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerRightItems: (props) => [
            {
              type: "menu",
              icon: {
                name: "ellipsis",
                type: "sfSymbol",
              },
              label: "Filter",
              menu: {
                title: "Filter by",
                items: [
                  {
                    type: "action",
                    label: "Body part",
                    icon: {
                      name: "figure.arms.open",
                      type: "sfSymbol",
                    },
                    onPress: () => handleFilterModeChange("body part"),
                    selected: filterMode === "body part",
                  },
                  {
                    type: "action",
                    label: "Styles",
                    icon: {
                      name: "paintbrush.fill",
                      type: "sfSymbol",
                    },
                    onPress: () => handleFilterModeChange("styles"),
                    selected: filterMode === "styles",
                  },
                ],
              },
            },
          ],
        }}
      />
      <ExploreScreen />
    </>
  );
}

export default function Explore() {
  return (
    <ExploreFilterProvider>
      <ExploreContent />
    </ExploreFilterProvider>
  );
}
