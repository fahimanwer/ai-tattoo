## Summary
Adds a button to toggle a grid overlay in the camera view for composition assistance.

## Changes
- Added `showGrid` state to control grid overlay visibility
- Created `GridOverlay` component that displays a rule-of-thirds grid (lines at 33% and 66% positions)
- Added grid toggle button next to the camera flip button in the controls
- The grid button highlights yellow when the grid is active

## How it works
When the user taps the grid button (grid icon), a semi-transparent white grid overlay appears on the camera preview. This helps with photo composition using the rule of thirds. Tapping the button again hides the grid.

_This PR was generated with [Warp](https://www.warp.dev/)._
