'use client'

import { useState, useEffect } from 'react'
import { Wallet, TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const mockPortfolioData = [
  { date: 'Jan', value: 45000 },
  { date: 'Feb', value: 47500 },
  { date: 'Mar', value: 46200 },
  { date: 'Apr', value: 52000 },
  { date: 'May', value: 54500 },
  { date: 'Jun', value: 58000 },
]

const mockSpendingData = [
  { name: 'Food', value: 450, color: '#10b981' },
  { name: 'Transport', value: 280, color: '#3b82f6' },
  { name: 'Shopping', value: 380, color: '#8b5cf6' },
  { name: 'Bills', value: 520, color: '#f59e0b' },
  { name: 'Entertainment', value: 180, color: '#ef4444' },
]

const mockAccounts = [
  { name: 'Checking', balance: 5420.50, institution: 'Chase Bank', type: 'checking' },
  { name: 'Savings', balance: 12500.00, institution: 'Ally Bank', type: 'savings' },
  { name: 'Investment', balance: 45800.00, institution: 'Fidelity', type: 'investment' },
  { name: 'Credit Card', balance: -1245.80, institution: 'Amex', type: 'credit' },
]

const mockTransactions = [
  { id: 1, name: 'Amazon', amount: -89.99, date: '2024-01-15', category: 'Shopping', type: 'debit' },
  { id: 2, name: 'Salary Deposit', amount: 3500.00, date: '2024-01-14', category: 'Income', type: 'credit' },
  { id: 3, name: 'Whole Foods', amount: -156.23, date: '2024-01-13', category: 'Food', type: 'debit' },
  { id: 4, name: 'Netflix', amount: -15.99, date: '2024-01-12', category: 'Entertainment', type: 'debit' },
  { id: 5, name: 'Uber', amount: -24.50, date: '2024-01-11', category: 'Transport', type: 'debit' },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  const totalBalance = mockAccounts.reduce((acc, item) => acc + item.balance, 0)
  const totalAssets = mockAccounts.filter(a => a.balance > 0).reduce((acc, a) => acc + a.balance, 0)
  const totalLiabilities = mockAccounts.filter(a => a.balance < 0).reduce((acc, a) => acc + Math.abs(a.balance), 0)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here&apos;s your financial overview.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Net Worth</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <Wallet className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+12.5%</span>
            <span className="text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Assets</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+8.2%</span>
            <span className="text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Liabilities</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                ${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <ArrowDownRight className="h-4 w-4 text-emerald-500" />
            <span className="text-emerald-500 font-medium">-3.1%</span>
            <span className="text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Monthly Spending</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">$1,810</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingDown className="h-4 w-4 text-emerald-500" />
            <span className="text-emerald-500 font-medium">-$245</span>
            <span className="text-slate-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Portfolio Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockPortfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value: number | undefined) => `$${((value ?? 0) / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, 'Value']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={mockSpendingData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {mockSpendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {mockSpendingData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-slate-600">{item.name}</span>
                <span className="text-sm font-medium text-slate-900">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Linked Accounts</h3>
              <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                + Add Account
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {mockAccounts.map((account, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    account.type === 'credit' ? 'bg-red-100' :
                    account.type === 'investment' ? 'bg-blue-100' :
                    'bg-emerald-100'
                  }`}>
                    <Wallet className={`h-5 w-5 ${
                      account.type === 'credit' ? 'text-red-600' :
                      account.type === 'investment' ? 'text-blue-600' :
                      'text-emerald-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{account.name}</p>
                    <p className="text-sm text-slate-500">{account.institution}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    account.balance >= 0 ? 'text-slate-900' : 'text-red-600'
                  }`}>
                    ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">{account.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
              <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-emerald-100' : 'bg-slate-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{transaction.name}</p>
                    <p className="text-sm text-slate-500">{transaction.date} · {transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'
                  }`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
