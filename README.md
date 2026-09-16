# TapFlow Frontend

Operator dashboard for **Stellar fee sponsorship** (TapFlow).

## v2.0.0

- Horizon reachability indicator in the nav
- Sponsor wallet form validates **G-strkey** addresses
- Wallet list links to stellar.expert accounts
- Pending sponsorship hashes are not linked as fake explorer txs
- Contract explorer link when `NEXT_PUBLIC_CONTRACT_ID` is set
- Fee quote helper + API client `quoteFee`
- Error boundary, Vitest, GitHub Actions, Next 16 webpack build

```bash
npm install
npm test
npm run build
npm run dev
```

Pairs with `TapBackend` + `TapContract`. Never commit private keys.
