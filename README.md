# TapFlow Frontend — MVP Dashboard

Stellar payment sponsorship dashboard for operators and integrators. Manage API keys, sponsor wallets, policies, and monitor sponsored transactions.

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |
| `NEXT_PUBLIC_CONTRACT_ID` | Soroban contract ID (for explorer links) | `CBCDJMWP2K7XPQE5WXLCEKYLZV5KCCDJZQ4ZDX3NRQJ2C7FKX5MFMAY` |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Network: `testnet` or `mainnet` | `testnet` |

## Features

### 1. Dashboard
- **Metrics**: Total transactions, total fees spent, active policies, app count
- **Low Balance Alerts**: Real-time warnings for sponsor wallets below threshold
- **Quick Start Guide**: Onboarding steps for new operators
- **Apps Overview**: List of integrated apps with API key management links

### 2. API Keys
- Create new API keys with custom names
- View key prefix, creation date, and last usage
- Revoke keys with confirmation dialog
- Per-app key management

### 3. Sponsor Wallets
- Add sponsor wallets with Stellar addresses
- Set low-balance thresholds and alerts
- Visual balance indicator with color-coded status
- One-click wallet top-up functionality
- Track balance over time

### 4. Transaction Log
- Real-time transaction monitoring
- Search by user ID
- Filter by status (pending, success, failed)
- Direct links to Stellar Expert explorer
- Transaction details: amount, fee, status, timestamp

## Tech Stack

- **Next.js 15** — React framework
- **React 19** — UI library
- **TypeScript 5** — Type safety
- **Tailwind CSS v4** — Styling
- **@tailwindcss/postcss** — Tailwind PostCSS integration

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── layout.tsx            # Root layout with navigation
├── page.tsx              # Dashboard home page
├── globals.css           # Tailwind imports & global styles
├── api-keys/
│   └── page.tsx         # API keys management page
├── wallets/
│   └── page.tsx         # Sponsor wallets page
└── transactions/
    └── page.tsx         # Transaction log page

components/
├── MetricCard.tsx       # Metric display card
├── WalletAlert.tsx      # Low-balance wallet alert
├── ApiKeyForm.tsx       # Create API key form
├── ApiKeyList.tsx       # API keys table
├── WalletForm.tsx       # Add wallet form
├── WalletList.tsx       # Wallets management
├── TransactionTable.tsx # Transaction log table
├── ApiKeysContent.tsx   # API keys page content (with useSearchParams)
├── WalletsContent.tsx   # Wallets page content (with useSearchParams)
└── TransactionsContent.tsx # Transactions page content (with useSearchParams)

lib/
├── api.ts              # Mock API client (connect to Backend here)
└── types.ts            # TypeScript types for data models
```

## API Client

The `lib/api.ts` file provides a type-safe API client with endpoints for:

**Dashboard & Orgs**
- `getDashboard()` — Fetch dashboard metrics and alerts

**Apps**
- `getApps()` — List all apps
- `createApp(data)` — Create new app

**API Keys**
- `getApiKeys(appId)` — List app's API keys
- `createApiKey(appId, data)` — Create new key
- `revokeApiKey(appId, keyId)` — Revoke a key

**Policies**
- `getPolicies(appId)` — List sponsorship policies
- `createPolicy(appId, data)` — Create policy

**Wallets**
- `getWallets(appId)` — List sponsor wallets
- `createWallet(appId, data)` — Add wallet
- `topUpWallet(appId, walletId, data)` — Fund wallet

**Transactions**
- `getTransactions(appId, filters)` — List with optional filters
- `getTransaction(appId, txId)` — Get single transaction

## Connecting to Backend

Replace the mock API calls in `lib/api.ts` with real Backend endpoints as they're implemented:

```typescript
// Example: connect getApps to real Backend
export const api = {
  getApps: () => apiCall<App[]>('/v1/apps'),
  // ... update other endpoints
};
```

The API client already handles:
- Base URL from `NEXT_PUBLIC_API_URL`
- JSON content-type headers
- Error handling and serialization
- TypeScript type safety

## UI Components

Reusable components with Tailwind CSS:

- `.card` — Styled container (white bg, border, shadow)
- `.btn-primary` — Primary action button
- `.btn-secondary` — Secondary action button
- `.badge` / `.badge-success` / `.badge-warning` / `.badge-error` — Status badges

## Key Design Decisions

1. **Suspense Boundaries**: Pages using `useSearchParams()` wrapped in Suspense per Next.js 15 requirements
2. **Custom Colors**: Stellar branding colors use CSS variables (`--color-stellar`, `--color-stellar-light`)
3. **Mock API**: API client structure ready for Backend integration—no breaking changes needed
4. **Component Separation**: Content components handle state; page wrappers handle Suspense
5. **Client Components**: All interactive pages marked with `'use client'` for interactivity

## Next Steps

1. **Backend Integration**: Implement API endpoints in TapBackend (NestJS)
2. **Authentication**: Add session/JWT auth to pages and API calls
3. **Real-time Updates**: Add WebSocket support for live transaction monitoring
4. **Error Handling**: Implement retry logic, exponential backoff for API calls
5. **Testing**: Add Jest + React Testing Library tests
6. **Deployment**: Configure for Vercel or self-hosted deployment

## Design Principles

- **Plain language** — "Sponsor balance," "fee limit" — not jargon-heavy
- **Trust** — All transactions link to Stellar Expert explorer
- **North star** — Time to first successful sponsored transaction
- **Operational** — Finance, support, engineering runbooks use this UI daily

## License

Proprietary — TapFlow. Contact the team for integrator access.