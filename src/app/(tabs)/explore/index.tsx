import { ExploreScreen } from "@/src/components/screens/explore";
import {
  ExploreFilterProvider,
  useExploreFilter,
} from "@/src/context/ExploreFilterContext";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";

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
              label:
                filterMode === "body part"
                  ? "Filter: Body part"
                  : "Filter: Styles",
              icon: {
                name: "line.3.horizontal.decrease",
                type: "sfSymbol",
              },
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
                    state: filterMode === "body part" ? "on" : "off",
                  },
                  {
                    type: "action",
                    label: "Styles",
                    icon: {
                      name: "paintbrush.fill",
                      type: "sfSymbol",
                    },
                    onPress: () => handleFilterModeChange("styles"),
                    state: filterMode === "styles" ? "on" : "off",
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
