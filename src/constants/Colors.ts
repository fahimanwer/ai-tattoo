import { Color } from './TWPalette';

const tintColorLight = Color.violet[600];
const tintColorDark = Color.green[500];
const light = Color.zinc[950];
const dark = Color.zinc[50];
const borderLight = `${Color.zinc[950]}20`;
const borderDark = `${Color.zinc[50]}20`;
const iconLight = Color.zinc[400];
const iconDark = Color.zinc[300];

export const Colors = {
  light: {
    text: light,
    background: dark,
    border: borderLight,
    tint: tintColorLight,
    icon: iconLight,
    tabIconDefault: iconLight,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: dark,
    background: light,
    border: borderDark,
    tint: tintColorDark,
    icon: iconDark,
    tabIconDefault: iconDark,
    tabIconSelected: tintColorDark,
  },
  };