# 🐉 AI Tattoo

<img width="1920" height="400" alt="AI Tattoo Cover" src="https://github.com/user-attachments/assets/291f931a-d6a4-4440-a4cc-42655da23231" />

Preview virtual tattoos on your body with AI – arm, leg, face & more.

Try on tattoos instantly with AI! Upload a photo of your arm, leg, or face and see how any tattoo design looks on your skin. Choose from thousands of designs or upload your own. AI Tattoo Try On makes tattoo preview easy, realistic, and fun.

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Node.js](https://nodejs.org/) v18 or higher
- A PostgreSQL database (we recommend [Neon](https://neon.tech/) or [Supabase](https://supabase.com/))
- [EAS CLI](https://docs.expo.dev/build/setup/) for deployment

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ai-tattoo
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

This project requires environment variables in two separate files due to Prisma limitations:

#### Create `.env.local` file

Copy the example file and configure all required variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"

# Google OAuth (for authentication)
EXPO_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Gemini AI API
GEMINI_API_KEY="your-gemini-api-key"
```

#### Create `.env` file (for Prisma)

⚠️ **Important**: Prisma does not support `.env.local` files, so you need a separate `.env` file with **only** the `DATABASE_URL`:

```bash
echo 'DATABASE_URL="your-postgresql-connection-string"' > .env
```

Make sure this matches the `DATABASE_URL` in your `.env.local` file.

### Database Setup with Prisma

4. **Run Prisma migrations**

After setting up your database connection, generate the Prisma client and run migrations:

```bash
# Generate Prisma client
bunx prisma generate

# Run database migrations (creates all tables)
bunx prisma migrate deploy

# For development, you can also use:
bunx prisma migrate dev
```

This will:

- Create all necessary tables in your database
- Set up the schema defined in `prisma/schema.prisma`
- Generate the Prisma Client for type-safe database queries

5. **Verify database setup**

You can use Prisma Studio to view your database:

```bash
bunx prisma studio
```

## 📱 Development

### Running Locally

**Important**: This app uses **Expo UI** which requires a **development build**. You **cannot** use Expo Go.

1. **Create a development build**

```bash
# For iOS
npx expo prebuild -p ios && npx expo run:ios

# For Android
# We haven't tested on Android and is likely this won't work since we are using iOS only components in some parts of the app. We plan to support Android in the future but as of now is not supported.
```

The first time you run these commands, it will create a development build. This process can take several minutes.

2. **Start the development server**

```bash
bun start
```

### RevenueCat Setup (Optional but Recommended)

Currently, RevenueCat is required for the app to run. However, if you want to run the app locally without setting up RevenueCat:

1. Comment out RevenueCat-related code in:

   - `app/api/webhook/rc+api.ts`
   - Any subscription-related components
   - Context providers that use RevenueCat

2. You'll need to manually handle subscription logic or use mock data

**Note**: This is a work in progress, and we plan to make RevenueCat optional in future updates.

## 🚀 Deployment

### API Routes (EAS Hosting)

The API routes use EAS hosting. To deploy:

1. **Deploy to production**

```bash
bun run deploy:web
```

2. **Configure EAS**

Visit the [EAS dashboard](https://expo.dev/) to:

- Manage your deployments
- Configure environment variables
- View build logs
- Set up webhooks

Refer to the [EAS hosting documentation](https://docs.expo.dev/eas/) for more details.

## 🗂️ Project Structure

```
├── app/                    # Expo Router routes
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Bottom tab navigation
│   └── api/               # API routes (EAS hosted)
├── components/
│   ├── screens/           # Screen components
│   └── ui/                # Reusable UI components
├── constants/             # App constants & configuration
├── context/               # React contexts
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and API clients
├── prisma/                # Database schema and migrations
├── server-utils/          # Server-side utilities
└── types/                 # TypeScript type definitions
```

## 🔑 Required Services

### 1. Database (PostgreSQL)

- [Neon](https://neon.tech/) - Recommended, serverless PostgreSQL
- [Supabase](https://supabase.com/) - PostgreSQL with built-in Auth & Storage
- Any PostgreSQL provider with connection pooling

### 2. Google OAuth

- Create a project in [Google Cloud Console](https://console.cloud.google.com/)
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URIs

### 3. Gemini AI API

- Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Used for AI image generation

### 4. Better Auth Secret

- Generate a secure random string for `BETTER_AUTH_SECRET`
- You can use: `openssl rand -base64 32`

## 📚 Tech Stack

- **Framework**: [Expo](https://expo.dev/) with [Expo Router](https://expo.github.io/router/)
- **UI Library**: [Expo UI](https://ui.expo.dev/) (requires development build)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Database**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Payments**: [RevenueCat](https://www.revenuecat.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/)
- **Hosting**: [EAS Hosting](https://expo.dev/eas)
- **Vexo**: [Vexo Analytics](https://vexo.co)

## 📖 Documentation

- [Gemini Image Generation API](https://ai.google.dev/gemini-api/docs/image-generation#rest)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo UI Documentation](https://ui.expo.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)

## 💰 Pricing Tiers

**FREE** → 3–5 free generations on signup

**STARTER**

- $4.99/month → 75 generations

**PLUS**

- $9.99/month → 200 generations

**PRO**

- $29.99/month → 600 generations

**Example**

| Plan    | Price  | Generations | Approx. Cost @ $0.039/img | Margin | Users |
| ------- | ------ | ----------- | ------------------------- | ------ | ----- |
| Starter | $4.99  | 75          | ~$2.93                    | ~40%   | 100   |
| Plus    | $9.99  | 200         | ~$7.80                    | ~22%   | 10    |
| Pro     | $29.99 | 600         | ~$23.40                   | ~22%   | 1     |

You can also:
• Fair use cap (e.g. “up to 1200 generations/month”).
• Offer annual discount ($99/yr Pro).

## ⚠️ Correction: Why These Numbers Were Wrong

The original pricing model assumed **~$0.039 per image**, but after reviewing [Google’s actual Gemini pricing:](https://ai.google.dev/gemini-api/docs/pricing#standard_1)

### ✔ Output image cost is **~$0.134 EACH** (1K–2K resolution)

### ✔ Input images each cost **$0.0011**

### ✔ Weekly/monthly costs **scale with usage**

### ✔ Apple takes **15%**

### ✔ RevenueCat takes **1%**

### ✔ Hosting + DB adds **$0.30 per user**

This means your real cost per generation is **~$0.135**, not $0.039.

### **Your existing plans actually LOSE money:**

| Plan              | Cost (your real cost) | Price  | Outcome               |
| ----------------- | --------------------- | ------ | --------------------- |
| Starter (75 gens) | ~$10.43               | $4.99  | **–$5.44 loss/user**  |
| Plus (200 gens)   | ~$27.30               | $9.99  | **–$17.31 loss/user** |
| Pro (600 gens)    | ~$81.30               | $29.99 | **–$51.31 loss/user** |

So we need a **new pricing strategy**.

---

## ✅ Path Forward — Weekly + Monthly Pricing (Industry Standard)

The new model:

- Weekly → **high conversion**, smaller perceived price, stronger LTV
- Monthly → optional, slightly cheaper per generation
- Generations adjusted to be profitable
- Profits calculated **after** Apple (15%), RC (1%), hosting, and real model costs

We'll show:

- **Starter Weekly**
- **Plus Weekly**
- **Pro Weekly**
- **Monthly equivalents for each**

---

## 📆 Recommended Weekly Pricing (US Market)

| Plan               | Price (wk) | Gens/wk | Your Cost | Your Revenue After Apple/RC | **Profit/wk** |
| ------------------ | ---------- | ------- | --------- | --------------------------- | ------------- |
| **Starter Weekly** | **$4.99**  | 25 gens | $3.38     | $4.19                       | **+$0.81**    |
| **Plus Weekly**    | **$6.99**  | 35 gens | $4.73     | $5.87                       | **+$1.14**    |
| **Pro Weekly**     | **$9.99**  | 50 gens | $6.75     | $8.39                       | **+$1.64**    |

---

## 📅 Recommended Monthly Pricing

These are priced to be cheaper than weekly on a per-generation basis, but still profitable.

### Monthly pricing must match the value of the weekly plans.

| Monthly             | Price      | Gens     | Your Cost | Your Revenue After Apple/RC | **Profit/mo** |
| ------------------- | ---------- | -------- | --------- | --------------------------- | ------------- |
| **Starter Monthly** | **$14.99** | 75 gens  | $10.13    | $12.59                      | **+$0.69**    |
| **Plus Monthly**    | **$24.99** | 125 gens | $16.88    | $20.99                      | **+$4.11**    |
| **Pro Monthly**     | **$39.99** | 200 gens | $27.00    | $33.59                      | **+$6.59**    |
