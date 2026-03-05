/**
 * Playground context barrel exports.
 *
 * Backwards-compatible: PlaygroundContext is an alias for PlaygroundCoreContext.
 */

export { PlaygroundCoreContext, PlaygroundCoreProvider } from "./PlaygroundCoreContext";
export type {
  PlaygroundCoreContextValue,
  ImageGenerationMutation,
  InputControlsHandle,
} from "./PlaygroundCoreContext";

export { PlaygroundProvider } from "./PlaygroundProvider";

export type {
  FlowType,
  FlowPayload,
  PortraitStyle,
} from "./flow-types";

// Backwards-compatible alias so existing `use(PlaygroundContext)` still works
export { PlaygroundCoreContext as PlaygroundContext } from "./PlaygroundCoreContext";
