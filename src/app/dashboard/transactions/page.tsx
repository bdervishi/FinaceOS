'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Download, Calendar, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const mockTransactions = [
  { id: 1, name: 'Amazon', amount: -89.99, date: '2024-01-15', category: 'Shopping', merchant: 'Amazon', type: 'debit', status: 'completed' },
  { id: 2, name: 'Salary Deposit', amount: 3500.00, date: '2024-01-14', category: 'Income', merchant: 'Employer Inc.', type: 'credit', status: 'completed' },
  { id: 3, name: 'Whole Foods', amount: -156.23, date: '2024-01-13', category: 'Food & Drink', merchant: 'Whole Foods Market', type: 'debit', status: 'completed' },
  { id: 4, name: 'Netflix', amount: -15.99, date: '2024-01-12', category: 'Entertainment', merchant: 'Netflix', type: 'debit', status: 'completed' },
  { id: 5, name: 'Uber', amount: -24.50, date: '2024-01-11', category: 'Transportation', merchant: 'Uber', type: 'debit', status: 'completed' },
  { id: 6, name: 'Starbucks', amount: -8.75, date: '2024-01-10', category: 'Food & Drink', merchant: 'Starbucks', type: 'debit', status: 'pending' },
  { id: 7, name: 'Electric Bill', amount: -145.00, date: '2024-01-09', category: 'Utilities', merchant: 'Electric Company', type: 'debit', status: 'completed' },
  { id: 8, name: 'Freelance Work', amount: 1250.00, date: '2024-01-08', category: 'Income', merchant: 'Client Corp', type: 'credit', status: 'completed' },
]

const categories = ['All', 'Shopping', 'Food & Drink', 'Entertainment', 'Transportation', 'Utilities', 'Income']

export default function TransactionsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

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

  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalIncome = mockTransactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0)
  const totalExpenses = Math.abs(mockTransactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500 mt-1">View and manage all your transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar className="h-4 w-4" />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Income</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">+${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600 mt-1">-${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Net</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">${(totalIncome - totalExpenses).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
        <div className="p-4 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-200">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${transaction.type === 'credit' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownRight className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-slate-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{transaction.name}</p>
                  <p className="text-sm text-slate-500">{transaction.merchant} • {transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
