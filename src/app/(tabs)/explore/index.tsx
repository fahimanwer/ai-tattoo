import { ExploreScreen } from "@/src/components/screens/explore";
import {
  ExploreFilterProvider,
  useExploreFilter,
} from "@/src/context/ExploreFilterContext";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";

function ExploreContent() {
  const { filterMode, setFilterMode, handleBodyPartReset } = useExploreFilter();

  const handleFilterModeChange = (mode: "body part" | "styles" | "moods") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFilterMode(mode);
    handleBodyPartReset();
  };

  const getFilterLabel = () => {
    if (filterMode === "body part") return "Filter: Body part";
    if (filterMode === "styles") return "Filter: Styles";
    return "Filter: Moods";
  };

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerRightItems: (props) => [
            {
              type: "menu",
              label: getFilterLabel(),
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
                  {
                    type: "action",
                    label: "Moods",
                    icon: {
                      name: "heart.fill",
                      type: "sfSymbol",
                    },
                    onPress: () => handleFilterModeChange("moods"),
                    state: filterMode === "moods" ? "on" : "off",
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
