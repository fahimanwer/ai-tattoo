/**
 * Backwards-compatibility shim.
 * Re-exports everything from the new playground context modules.
 *
 * All files importing from "@/src/context/PlaygroundContext" continue to work.
 */

export {
  PlaygroundCoreContext as PlaygroundContext,
  PlaygroundProvider,
} from "./playground";

export type {
  PlaygroundCoreContextValue as PlaygroundContextValue,
  ImageGenerationMutation,
  InputControlsHandle,
} from "./playground";
