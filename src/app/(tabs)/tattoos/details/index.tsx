import { TattooDetailScreen } from "@/src/components/tattoos/TattooDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function TattooDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <TattooDetailScreen tattooId={id} />;
}
