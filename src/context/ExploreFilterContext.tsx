import React, { createContext, useContext, useState, ReactNode } from "react";

type FilterMode = "body part" | "styles";

interface ExploreFilterContextValue {
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
  selectedBodyPart: string | null;
  setSelectedBodyPart: (bodyPart: string | null) => void;
  selectedStyle: number | null;
  setSelectedStyle: (style: number | null) => void;
  handleBodyPartReset: () => void;
}

const ExploreFilterContext = createContext<ExploreFilterContextValue | undefined>(
  undefined
);

export function ExploreFilterProvider({ children }: { children: ReactNode }) {
  const [filterMode, setFilterMode] = useState<FilterMode>("body part");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

  const handleBodyPartReset = () => {
    setSelectedBodyPart(null);
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    // Reset filters when switching modes
    setSelectedBodyPart(null);
    setSelectedStyle(null);
  };

  return (
    <ExploreFilterContext.Provider
      value={{
        filterMode,
        setFilterMode: handleFilterModeChange,
        selectedBodyPart,
        setSelectedBodyPart,
        selectedStyle,
        setSelectedStyle,
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

