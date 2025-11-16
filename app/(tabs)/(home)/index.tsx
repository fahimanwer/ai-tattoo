import { Home } from "@/components/screens/Home";
import { Stack, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerLeftItems: (props) => [
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
          ],
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

              // type: "menu",
              // variant: "prominent",
              // label: "New Tattoo",
              // tintColor: "yellow",
              // labelStyle: {
              //   // color: "yellow",
              //   fontWeight: "bold",
              // },
              // menu: {
              //   // title: "New Tattoo",
              //   items: [
              //     {
              //       type: "action",
              //       label: "Try On Tattoo",
              //       onPress: () => {
              //         handleTryOnTattoo();
              //       },
              //       icon: {
              //         name: "person.crop.square",
              //         type: "sfSymbol",
              //       },
              //     },
              //     {
              //       type: "action",
              //       label: "Tattoo Playground",
              //       onPress: () => {
              //         router.push("/(playground)");
              //       },
              //       icon: {
              //         name: "apple.image.playground",
              //         type: "sfSymbol",
              //       },
              //     },
              //   ],
              // },
            },
          ],
        }}
      />
      <Home />
    </>
  );
}
