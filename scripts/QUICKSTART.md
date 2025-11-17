# Quick Start Guide

## Generate BlurHash in 3 Steps

### Step 1: Install Dependencies

Navigate to the scripts directory and install dependencies:

```bash
cd scripts
npm install
```

### Step 2: Run the Script

```bash
npm run generate-blurhash
```

Or directly:

```bash
node generate-blurhash.js
```

### Step 3: Use the Generated Code

After the script completes, you'll find two files:
- `blurhash-results.json` - Raw data
- `blurhash-code.ts` - Ready-to-use TypeScript code

**Option A: Copy to your lib folder**

```bash
cp blurhash-code.ts ../lib/blurhash-data.ts
```

Then import in your components:

```typescript
import { getTattooBlurHash } from '@/lib/blurhash-data';

const blurHash = getTattooBlurHash(1, 'cover');
```

**Option B: Manually integrate into existing files**

The script prints the TypeScript code to the console. Copy and paste the relevant parts into your `lib/featured-tattoos.ts` file.

## Example Usage

```tsx
import { Image } from 'expo-image';
import { getTattooBlurHash } from './lib/blurhash-data';

export function TattooCard({ tattoo }) {
  const blurHash = getTattooBlurHash(tattoo.id, 'cover');
  
  return (
    <Image
      source={{ uri: tattoo.image.uri }}
      placeholder={{ blurhash: blurHash }}
      style={{ width: 200, height: 300 }}
      contentFit="cover"
      transition={200}
    />
  );
}
```

## What You'll See

The script will:
1. ✓ Download each image from CloudFront
2. ✓ Generate BlurHash (shows progress in console)
3. ✓ Save results to JSON and TypeScript files
4. ✓ Print TypeScript code for easy copy-paste

Example output:
```
Processing: Japanese - Cover
✓ Japanese - Cover: LGF5]+Yk^6#M@-5c,1J5@[or[Q6.
Processing: Japanese - Gallery 1
✓ Japanese - Gallery 1: L5F~8{xut7of~qIUfQj[4nIU%M%M
...
```

## Troubleshooting

**Script hangs or takes forever?**
- The script processes ~100 images, it may take 1-2 minutes
- Check your internet connection

**Module not found errors?**
- Make sure you ran `npm install` in the scripts directory

**Need to regenerate?**
- Just run the script again, it will overwrite previous files

## Benefits of Using BlurHash

✅ **Better UX** - Users see a blurred preview while images load  
✅ **Perceived Performance** - Feels faster than a blank space  
✅ **Tiny Size** - Each hash is ~20-30 characters  
✅ **Works Offline** - The hash is stored locally  
✅ **Smooth Transitions** - Expo Image handles the fade beautifully  

That's it! You're ready to improve your app's image loading experience. 🎨

