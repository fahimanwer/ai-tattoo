import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const DISABLE_PROFILE_BUTTON_FOR = 3_000;

export default function HomeScreen() {
  const router = useRouter();
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const isAuthenticated =
    session?.user !== undefined && !isPending && !isRefetching;

  const [isProfileButtonDisabled, setIsProfileButtonDisabled] = useState(true);

  // TODO: Added this because app crashes if you press the profile button too quickly.
  useEffect(() => {
    setTimeout(() => {
      setIsProfileButtonDisabled(false);
    }, DISABLE_PROFILE_BUTTON_FOR);
  }, [isAuthenticated, isProfileButtonDisabled]);

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerLeftItems: (props) =>
            isAuthenticated
              ? [
                  {
                    type: "button",
                    label: "Profile",
                    disabled: isProfileButtonDisabled,
                    icon: {
                      name: "person.fill",
                      type: "sfSymbol",
                    },
                    onPress: () => {
                      router.push("/profile");
                    },
                  },
                ]
              : [],
          unstable_headerRightItems: (props) => [
            {
              type: "button",
              label: "New Tattoo",
              variant: "prominent",
              tintColor: "yellow",
              labelStyle: {
                fontWeight: "bold",
              },
              onPress: () => {
                router.push("/(playground)");
              },
            },
          ],
        }}
      />
      <Home />
    </>
  );
}
