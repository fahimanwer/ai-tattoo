/**
 * European Portuguese locale - merges core + features
 */
import { ptPTCore } from './core';
import { ptPTFeatures } from './features';
export const ptPT = { ...ptPTCore, ...ptPTFeatures };
