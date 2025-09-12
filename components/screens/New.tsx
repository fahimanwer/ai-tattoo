import { useTattooCreation } from "@/context/TattooCreationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { BodyPartSelection } from "./BodyPartSelection";
import { CustomDetails } from "./CustomDetails";
import { TattooCreation } from "./TattooCreation";
import { TattooStyleSelection } from "./TattooStyleSelection";

export function New() {
  const { currentStep, setCurrentStep } = useTattooCreation();

  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  // Handle back navigation
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (currentStep && currentStep > 1) {
          setCurrentStep(currentStep - 1);
          return true; // Prevent default back action
        }
        return false; // Allow normal back navigation
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [currentStep, setCurrentStep])
  );

  // Render different views based on current step
  switch (currentStep) {
    case 1:
      return <BodyPartSelection />;
    case 2:
      return <TattooStyleSelection />;
    case 3:
      return <CustomDetails />;
    case 4:
      return <TattooCreation />;
    default:
      return <BodyPartSelection />;
  }
}
