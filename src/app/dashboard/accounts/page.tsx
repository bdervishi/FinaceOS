'use client'

import { useState, useEffect } from 'react'
import { Wallet, Plus, Building, CreditCard, TrendingUp, PiggyBank } from 'lucide-react'

const mockAccounts = [
  { id: 1, name: 'Chase Checking', type: 'checking', institution: 'Chase Bank', balance: 5420.50, mask: '4532', connected: true },
  { id: 2, name: 'Ally Savings', type: 'savings', institution: 'Ally Bank', balance: 12500.00, mask: '7891', connected: true },
  { id: 3, name: 'Fidelity 401k', type: 'investment', institution: 'Fidelity', balance: 45800.00, mask: '2341', connected: true },
  { id: 4, name: 'Amex Platinum', type: 'credit', institution: 'American Express', balance: -1245.80, mask: '1004', connected: true },
  { id: 5, name: 'Vanguard IRA', type: 'investment', institution: 'Vanguard', balance: 32100.00, mask: '5678', connected: false },
]

export default function AccountsPage() {
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

  const getIcon = (type: string) => {
    switch (type) {
      case 'checking': return Building
      case 'savings': return PiggyBank
      case 'investment': return TrendingUp
      case 'credit': return CreditCard
      default: return Wallet
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'checking': return 'bg-blue-100 text-blue-600'
      case 'savings': return 'bg-emerald-100 text-emerald-600'
      case 'investment': return 'bg-purple-100 text-purple-600'
      case 'credit': return 'bg-amber-100 text-amber-600'
      default: return 'bg-slate-100 text-slate-600'
    }
  }

  const totalAssets = mockAccounts.filter(a => a.balance > 0).reduce((acc, a) => acc + a.balance, 0)
  const totalLiabilities = mockAccounts.filter(a => a.balance < 0).reduce((acc, a) => acc + Math.abs(a.balance), 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500 mt-1">Manage your connected financial accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Link Account
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Assets</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">${totalAssets.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Liabilities</p>
          <p className="text-3xl font-bold text-red-600 mt-1">${totalLiabilities.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Net Worth</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">${(totalAssets - totalLiabilities).toLocaleString()}</p>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAccounts.map((account) => {
          const Icon = getIcon(account.type)
          return (
            <div key={account.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColor(account.type)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${account.connected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {account.connected ? 'Connected' : 'Pending'}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900">{account.name}</h3>
              <p className="text-sm text-slate-500">{account.institution}</p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">Balance</p>
                <p className={`text-2xl font-bold ${account.balance >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                  ${Math.abs(account.balance).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-2">•••• {account.mask}</p>
            </div>
          )
        })}

        {/* Add Account Card */}
        <button className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-200 hover:border-emerald-500 transition-colors flex flex-col items-center justify-center min-h-[200px]">
          <Plus className="h-8 w-8 text-slate-400 mb-2" />
          <p className="font-medium text-slate-600">Link New Account</p>
          <p className="text-sm text-slate-500">Connect via Plaid</p>
        </button>
      </div>
    </div>
  )
}
