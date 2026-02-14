/**
 * Hebrew locale - merges core + features
 */
import { heCore } from './core';
import { heFeatures } from './features';

export const he = { ...heCore, ...heFeatures };
