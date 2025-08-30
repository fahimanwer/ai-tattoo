# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an **Expo Starter Kit** - a React Native mobile app built with Expo Router, featuring a comprehensive UI component system inspired by TailwindCSS. The project uses Bun as the package manager and includes custom navigation, theming, and authentication patterns.

## Essential Development Commands

### Package Management
```bash
# Install dependencies (use Bun, not npm/yarn)
bun install

# Add new dependencies
bun add <package-name>
bun add -d <dev-package> # For dev dependencies
```

### Development Server
```bash
# Start Expo development server
npx expo start

# Platform-specific runs
npx expo run:ios     # Run on iOS simulator
npx expo run:android # Run on Android emulator
npx expo start --web # Run web version
```

### Code Quality
```bash
# Run ESLint
npx expo lint

# TypeScript type checking
npx tsc --noEmit
```

### Project Reset
```bash
# Reset project to blank state (removes example components)
npm run reset-project
```

## Architecture Overview

### File Structure Pattern
The project follows a clear separation pattern:
- `app/` - Expo Router file-based routing (mostly thin wrappers)
- `components/screens/` - Actual screen implementations
- `components/ui/` - Reusable UI components
- `context/` - React Context providers
- `hooks/` - Custom React hooks
- `constants/` - App configuration and color palettes
- `types/` - TypeScript type definitions

### Screen Organization Pattern
**Critical**: New screens should be created in `components/screens/` then imported in the corresponding `app/` route:

```tsx
// In app/example.tsx
import { Example } from "@/components/screens/Example";

export default function ExampleScreen() {
  return <Example />;
}
```

### Navigation Architecture
- Uses Expo Router with file-based routing
- Protected routes with `Stack.Protected` based on authentication
- Native tabs with SF Symbol icons
- Dynamic screen titles based on pathname
- Implements custom header styles with large title support

### Authentication System
Simple context-based authentication with `AuthContext`:
- `isAuthenticated` boolean state
- Protected vs non-protected route groups
- Onboarding flow for unauthenticated users
- Tab-based navigation for authenticated users

### Theme System
Sophisticated theming with multiple layers:
1. **TailwindCSS-inspired color palette** (`TWPalette.ts`) - 22 color families with shades 50-950
2. **App-specific colors** (`Colors.ts`) - Maps palette to semantic names (text, background, tint, etc.)
3. **Accent color system** (`useAccentColor`) - Dynamic background colors based on selected accent
4. **Automatic dark/light mode** support throughout

### UI Component System
Comprehensive component library with consistent patterns:
- **Size system**: `xs | sm | md | lg | xl | 2xl`
- **Color system**: All TailwindCSS colors supported
- **Radius system**: `none | xxs | xs | sm | md | lg | xl | full`
- **Variant patterns**: `solid | outline | soft | subtle | link` (buttons)
- **Type-safe props** with TypeScript interfaces

## Key Components

### Button Component
Full-featured button with haptic feedback, loading states, SF Symbol icons:
```tsx
<Button 
  title="Click me" 
  onPress={() => {}}
  variant="solid" // solid | outline | soft | subtle | link
  color="blue"    // Any TailwindCSS color
  size="md"       // xs to 2xl
  symbol="star.fill" // SF Symbol
  loading={false}
  disabled={false}
/>
```

### Input Component
Styled input with variant support:
```tsx
<Input 
  placeholder="Enter text"
  variant="outline" // outline | soft | subtle | underline
  color="blue"
  size="md"
/>
```

### Text Component
Typography system with semantic variants:
```tsx
<Text 
  type="title"    // title | subtitle | body | caption | link | xs-7xl
  weight="semibold" // ultralight to black
/>
```

## Development Conventions

### Export Patterns
- **Components**: Named exports (`export function ComponentName() {}`)
- **Screens**: Default exports (`export default function ScreenName() {}`)
- **Hooks**: Named exports with `use` prefix
- **Types/Interfaces**: Named exports

### File Naming
- **kebab-case**: Utility files (`navigation-options.tsx`, `color-scheme.ts`)
- **PascalCase**: Components, screens, contexts (`Button.tsx`, `HomeScreen.tsx`)

### Import Organization
```tsx
// 1. React imports
import { type ReactNode } from "react";
// 2. React Native imports  
import { StyleSheet, View } from "react-native";
// 3. Third-party libraries
import { Stack } from "expo-router";
// 4. Internal imports (using @/ alias)
import { Button } from "@/components/ui/Button";
```

### TypeScript Patterns
- Use `interface` for component props
- Extend React Native types when possible
- Create shared types in `types/` directory
- Use union types for variants (`"xs" | "sm" | "md"`)

### Platform-Specific Development
- Create `.android.tsx` equivalents for iOS-only components
- Use fallback implementations for Android compatibility
- Test cross-platform functionality

### Styling Approach
- Use `StyleSheet.create()` for component styles
- Leverage TailwindCSS-inspired color system from `TWPalette.ts`
- Support both light and dark themes
- Use `useThemeColor` hook for theme-aware styling

## Header Bug Fix

**Known Issue**: Large header title display bug
**Solution**: Use transparent background in header configuration:
```tsx
<Stack
  screenOptions={{
    headerLargeStyle: {
      backgroundColor: "transparent",
    },
  }}
>
```

## Font System

The app includes two Google Fonts with full weight variants:
- **Bodoni Moda**: Regular, Medium, SemiBold, Bold, ExtraBold, Black (with italics)
- **Oswald**: ExtraLight, Light, Regular, Medium, SemiBold, Bold

## Key Development Tips

1. **Use Bun**: This project is configured for Bun package manager
2. **Respect the screen pattern**: Always create screens in `components/screens/` first
3. **Leverage the type system**: The UI types (`UISize`, `UIColor`, `UIRadius`) ensure consistency
4. **Test both themes**: Components should work in light and dark modes
5. **Use SF Symbols**: The Icon component supports SF Symbols with proper sizing
6. **Follow the color system**: Use the TailwindCSS-inspired palette for consistency
7. **Handle loading states**: Components support loading and disabled states
8. **Add haptic feedback**: Use `expo-haptics` for better UX in interactive components

## Configuration Files

- `app.json` - Expo app configuration with plugins and platform settings
- `tsconfig.json` - TypeScript with strict mode and path aliases (`@/*`)
- `eslint.config.js` - ESLint with Expo configuration
- `package.json` - Bun-compatible with Expo 54.0.0-preview and React 19.1.0
