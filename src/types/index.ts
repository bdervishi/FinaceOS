export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface Account {
  id: string
  user_id: string
  plaid_account_id: string
  name: string
  type: string
  subtype: string
  mask: string
  current_balance: number
  available_balance: number | null
  currency: string
  created_at: string
}

export interface Transaction {
  id: string
  account_id: string
  plaid_transaction_id: string
  amount: number
  date: string
  name: string
  merchant_name: string | null
  category: string[]
  pending: boolean
  created_at: string
}

export interface Holding {
  id: string
  user_id: string
  symbol: string
  name: string
  quantity: number
  current_price: number
  total_value: number
  currency: string
  updated_at: string
}

export interface PortfolioSummary {
  totalValue: number
  dailyChange: number
  dailyChangePercent: number
  holdings: Holding[]
}

export interface CategorySpending {
  category: string
  amount: number
  percentage: number
}
