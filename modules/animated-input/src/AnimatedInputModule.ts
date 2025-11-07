import { NativeModule, requireNativeModule } from 'expo';

import { AnimatedInputModuleEvents } from './AnimatedInput.types';

declare class AnimatedInputModule extends NativeModule<AnimatedInputModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AnimatedInputModule>('AnimatedInput');
