/**
 * Greek locale - merges core + features
 */
import { elCore } from './core';
import { elFeatures } from './features';

export const el = { ...elCore, ...elFeatures };
