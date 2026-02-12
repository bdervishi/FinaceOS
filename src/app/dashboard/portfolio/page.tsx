'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Plus, Search } from 'lucide-react'

const mockHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: 50, price: 178.50, value: 8925.00, change: 2.5 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 20, price: 142.30, value: 2846.00, change: -0.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 35, price: 378.90, value: 13261.50, change: 1.2 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', quantity: 15, price: 178.25, value: 2673.75, change: 3.1 },
  { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 25, price: 248.50, value: 6212.50, change: -2.3 },
]

export default function PortfolioPage() {
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

  const totalValue = mockHoldings.reduce((acc, h) => acc + h.value, 0)
  const totalChange = mockHoldings.reduce((acc, h) => acc + (h.value * h.change / 100), 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
          <p className="text-slate-500 mt-1">Track your investments and holdings</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Add Holding
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Value</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Return</p>
          <div className="flex items-center gap-2 mt-1">
            {totalChange >= 0 ? (
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-500" />
            )}
            <p className={`text-3xl font-bold ${totalChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Holdings</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{mockHoldings.length}</p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Your Holdings</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search holdings..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Symbol</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockHoldings.map((holding) => (
                <tr key={holding.symbol} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-emerald-600">{holding.symbol}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{holding.name}</td>
                  <td className="px-6 py-4 text-right text-slate-900">{holding.quantity}</td>
                  <td className="px-6 py-4 text-right text-slate-900">${holding.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">${holding.value.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1 ${holding.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {holding.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
