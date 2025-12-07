import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { Stack, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const isAuthenticated =
    session?.user !== undefined && !isPending && !isRefetching;

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
