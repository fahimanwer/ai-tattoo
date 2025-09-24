import { GeneratedTattoo } from "@/types/tattoo";
import { createContext, ReactNode, useContext, useState } from "react";

interface TattooHistoryContextType {
  tattoos: GeneratedTattoo[];
  addTattoo: (
    tattoo: Omit<GeneratedTattoo, "id" | "generationDate" | "isFavorite">
  ) => void;
  toggleFavorite: (tattooId: string) => void;
  removeTattoo: (tattooId: string) => void;
  getFavorites: () => GeneratedTattoo[];
}

const TattooHistoryContext = createContext<
  TattooHistoryContextType | undefined
>(undefined);

export function TattooHistoryProvider({ children }: { children: ReactNode }) {
  const [tattoos, setTattoos] = useState<GeneratedTattoo[]>([]);

  const addTattoo = (
    tattooData: Omit<GeneratedTattoo, "id" | "generationDate" | "isFavorite">
  ) => {
    const newTattoo: GeneratedTattoo = {
      ...tattooData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      generationDate: new Date(),
      isFavorite: false,
    };

    setTattoos((prev) => [newTattoo, ...prev]);
  };

  const toggleFavorite = (tattooId: string) => {
    setTattoos((prev) =>
      prev.map((tattoo) =>
        tattoo.id === tattooId
          ? { ...tattoo, isFavorite: !tattoo.isFavorite }
          : tattoo
      )
    );
  };

  const removeTattoo = (tattooId: string) => {
    setTattoos((prev) => prev.filter((tattoo) => tattoo.id !== tattooId));
  };

  const getFavorites = () => {
    return tattoos.filter((tattoo) => tattoo.isFavorite);
  };

  return (
    <TattooHistoryContext.Provider
      value={{
        tattoos,
        addTattoo,
        toggleFavorite,
        removeTattoo,
        getFavorites,
      }}
    >
      {children}
    </TattooHistoryContext.Provider>
  );
}

export function useTattooHistory() {
  const context = useContext(TattooHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useTattooHistory must be used within a TattooHistoryProvider"
    );
  }
  return context;
}
