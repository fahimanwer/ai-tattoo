import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './AnimatedInput.types';

type AnimatedInputModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class AnimatedInputModule extends NativeModule<AnimatedInputModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(AnimatedInputModule, 'AnimatedInputModule');
