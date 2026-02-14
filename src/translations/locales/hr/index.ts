/**
 * Croatian locale - merges core + features
 */
import { hrCore } from './core';
import { hrFeatures } from './features';
export const hr = { ...hrCore, ...hrFeatures };
