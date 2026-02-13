import { Platform } from 'react-native';
import { requireNativeModule } from 'expo';

import type { NativeCoreHapticsModule } from './NativeCoreHaptics.types';

// Core Haptics is iOS-only. Provide a no-op fallback on other platforms.
const noop = async () => {};
const fallback: NativeCoreHapticsModule = {
  impact: noop,
  playPattern: noop,
};

export default Platform.OS === 'ios'
  ? requireNativeModule<NativeCoreHapticsModule>('NativeCoreHaptics')
  : fallback;
