import BodyPartParallaxView from "@/src/components/about/BodyPart";
import { useLocalSearchParams } from "expo-router";
import { ImageSourcePropType } from "react-native";

export default function BodyPart() {
  const { bodyPart, imageUrl, title } = useLocalSearchParams<{
    bodyPart: string;
    imageUrl: string;
    title?: string;
  }>();

  // Default values if params are missing
  const bodyPartValue = bodyPart || "arm";
  const coverImage: ImageSourcePropType = imageUrl
    ? { uri: imageUrl }
    : { uri: "" };

  return (
    <BodyPartParallaxView
      bodyPart={bodyPartValue}
      coverImage={coverImage}
      title={title}
    />
  );
}
