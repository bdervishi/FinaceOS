-- FinanceOS Database Schema
-- Run this in Supabase SQL Editor

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth0_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts Table
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plaid_account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  subtype TEXT,
  mask TEXT,
  current_balance DECIMAL(15,2),
  available_balance DECIMAL(15,2),
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  plaid_transaction_id TEXT,
  amount DECIMAL(15,2) NOT NULL,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  merchant_name TEXT,
  category TEXT[],
  pending BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Holdings Table
CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT,
  quantity DECIMAL(15,6) NOT NULL,
  current_price DECIMAL(15,4),
  total_value DECIMAL(15,2),
  currency TEXT DEFAULT 'USD',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;

-- Policies (Users see only their own data)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own accounts" ON accounts FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = accounts.user_id AND users.auth0_id = auth.uid())
);
CREATE POLICY "Users can insert own accounts" ON accounts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE users.id = accounts.user_id AND users.auth0_id = auth.uid())
);

CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM accounts WHERE accounts.id = transactions.account_id
          AND EXISTS (SELECT 1 FROM users WHERE users.id = accounts.user_id AND users.auth0_id = auth.uid()))
);

CREATE POLICY "Users can view own holdings" ON holdings FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = holdings.user_id AND users.auth0_id = auth.uid())
);
CREATE POLICY "Users can insert own holdings" ON holdings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE users.id = holdings.user_id AND users.auth0_id = auth.uid())
);
CREATE POLICY "Users can update own holdings" ON holdings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = holdings.user_id AND users.auth0_id = auth.uid())
);

-- Indexes for better performance
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_holdings_user_id ON holdings(user_id);
CREATE INDEX idx_holdings_symbol ON holdings(symbol);

-- Trigger to create user record on auth signup (for Supabase Auth)
-- This requires the auth.users table access which needs elevated permissions
-- Run this separately if you have admin access:
--
-- CREATE OR REPLACE FUNCTION public.handle_new_user()
-- RETURNS trigger AS $$
-- BEGIN
--   INSERT INTO public.users (auth0_id, email, name)
--   VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
--   RETURN new;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;
--
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
