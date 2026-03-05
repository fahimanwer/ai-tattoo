/**
 * PlaygroundProvider -- composes Playground core providers.
 * Single provider to wrap in the app layout.
 */

import * as React from "react";
import { PlaygroundCoreProvider } from "./PlaygroundCoreContext";

export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlaygroundCoreProvider>{children}</PlaygroundCoreProvider>;
}
