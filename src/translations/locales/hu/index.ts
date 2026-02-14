/**
 * Hungarian locale - merges core + features
 */
import { huCore } from './core';
import { huFeatures } from './features';

export const hu = { ...huCore, ...huFeatures };
