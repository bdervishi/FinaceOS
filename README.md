# FinanceOS - All-in-One Personal Finance Platform

A modern, full-stack personal finance application built with Next.js 14, Supabase, and integrated with Plaid for bank account aggregation and Finnhub for real-time market data.

## 🚀 Features

- **Dashboard Overview**: View net worth, assets, liabilities, and monthly spending at a glance
- **Bank Account Aggregation**: Connect multiple bank accounts via Plaid
- **Investment Portfolio Tracking**: Real-time stock and crypto prices via Finnhub
- **Transaction Management**: Automatic transaction categorization
- **Analytics & Charts**: Visualize spending patterns and portfolio performance
- **Secure Authentication**: Enterprise-grade security with Auth0

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Auth0
- **Banking Integration**: Plaid
- **Market Data**: Finnhub
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-os
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your `.env.local` with your API keys:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Auth0
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret

# Plaid
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox

# Finnhub
FINNHUB_API_KEY=your_finnhub_api_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 API Integrations

### Plaid (Banking)
- Bank account linking
- Transaction retrieval
- Balance information
- Investment holdings

### Finnhub (Market Data)
- Real-time stock quotes
- Market indices
- Cryptocurrency prices
- Company profile data

### Auth0 (Authentication)
- User authentication
- OAuth 2.0 support
- JWT token management

### Supabase (Database)
- User data storage
- Account information
- Transaction history
- Portfolio holdings

## 📁 Project Structure

```
finance-os/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── plaid/          # Plaid API routes
│   │   │   └── portfolio/      # Portfolio API routes
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css
│   ├── components/
│   │   └── Sidebar.tsx
│   ├── lib/
│   │   └── supabase.ts
│   └── types/
│       └── index.ts
├── .env.local
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🎯 MVP Roadmap

- [x] Landing page with features
- [x] Dashboard with financial overview
- [x] Account aggregation (Plaid integration)
- [x] Portfolio tracking (Finnhub integration)
- [x] Transaction list
- [x] Analytics charts

## 🔒 Security

- All API keys stored in environment variables
- Server-side API calls to protect sensitive credentials
- Encrypted data transmission
- GDPR compliant data handling

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

---

Built with ❤️ using Next.js, Supabase, Plaid, and Finnhub
