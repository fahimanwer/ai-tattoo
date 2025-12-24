import React, { createContext, ReactNode, useContext, useState } from "react";
import { customEvent } from "vexo-analytics";

type FilterMode = "body part" | "styles" | "moods";

interface ExploreFilterContextValue {
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
  selectedBodyPart: string | null;
  setSelectedBodyPart: (bodyPart: string | null) => void;
  selectedStyle: number | null;
  setSelectedStyle: (style: number | null) => void;
  selectedMood: number | null;
  setSelectedMood: (mood: number | null) => void;
  handleBodyPartReset: () => void;
}

const ExploreFilterContext = createContext<
  ExploreFilterContextValue | undefined
>(undefined);

export function ExploreFilterProvider({ children }: { children: ReactNode }) {
  const [filterMode, setFilterMode] = useState<FilterMode>("body part");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleBodyPartReset = () => {
    setSelectedBodyPart(null);
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    customEvent("explore_filter_changed", {
      filterMode: mode.replace(" ", "_"),
    });
    setFilterMode(mode);
    // Reset filters when switching modes
    setSelectedBodyPart(null);
    setSelectedStyle(null);
    setSelectedMood(null);
  };

  const handleBodyPartChange = (bodyPart: string | null) => {
    if (bodyPart !== null) {
      customEvent("explore_filter_applied", {
        filterMode: "body_part",
        filterValue: bodyPart,
      });
    }
    setSelectedBodyPart(bodyPart);
  };

  const handleStyleChange = (style: number | null) => {
    if (style !== null) {
      customEvent("explore_filter_applied", {
        filterMode: "styles",
        filterId: style,
      });
    }
    setSelectedStyle(style);
  };

  const handleMoodChange = (mood: number | null) => {
    if (mood !== null) {
      customEvent("explore_filter_applied", {
        filterMode: "moods",
        filterId: mood,
      });
    }
    setSelectedMood(mood);
  };

  return (
    <ExploreFilterContext.Provider
      value={{
        filterMode,
        setFilterMode: handleFilterModeChange,
        selectedBodyPart,
        setSelectedBodyPart: handleBodyPartChange,
        selectedStyle,
        setSelectedStyle: handleStyleChange,
        selectedMood,
        setSelectedMood: handleMoodChange,
        handleBodyPartReset,
      }}
    >
      {children}
    </ExploreFilterContext.Provider>
  );
}

export function useExploreFilter() {
  const context = useContext(ExploreFilterContext);
  if (context === undefined) {
    throw new Error(
      "useExploreFilter must be used within an ExploreFilterProvider"
    );
  }
  return context;
}
