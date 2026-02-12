'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'

const monthlyData = [
  { month: 'Jul', income: 5200, expenses: 3200 },
  { month: 'Aug', income: 4800, expenses: 3500 },
  { month: 'Sep', income: 5500, expenses: 3100 },
  { month: 'Oct', income: 5100, expenses: 3800 },
  { month: 'Nov', income: 5900, expenses: 3400 },
  { month: 'Dec', income: 6200, expenses: 4200 },
]

const spendingCategories = [
  { name: 'Housing', value: 1500, color: '#3b82f6' },
  { name: 'Food', value: 650, color: '#10b981' },
  { name: 'Transportation', value: 450, color: '#8b5cf6' },
  { name: 'Utilities', value: 320, color: '#f59e0b' },
  { name: 'Entertainment', value: 280, color: '#ef4444' },
  { name: 'Shopping', value: 520, color: '#ec4899' },
  { name: 'Other', value: 180, color: '#6b7280' },
]

const weeklyActivity = [
  { day: 'Mon', transactions: 5, amount: 245 },
  { day: 'Tue', transactions: 8, amount: 380 },
  { day: 'Wed', transactions: 3, amount: 120 },
  { day: 'Thu', transactions: 12, amount: 560 },
  { day: 'Fri', transactions: 15, amount: 720 },
  { day: 'Sat', transactions: 18, amount: 890 },
  { day: 'Sun', transactions: 6, amount: 280 },
]

export default function AnalyticsPage() {
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

  const totalIncome = monthlyData.reduce((acc, m) => acc + m.income, 0)
  const totalExpenses = monthlyData.reduce((acc, m) => acc + m.expenses, 0)
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Deep dive into your financial data</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Income (6mo)</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Expenses (6mo)</p>
          <p className="text-2xl font-bold text-red-600 mt-1">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Net Savings</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${(totalIncome - totalExpenses).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Savings Rate</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{savingsRate}%</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income vs Expenses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {spendingCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {spendingCategories.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-slate-600">{item.name}</span>
                <span className="text-sm font-medium text-slate-900">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="transactions" stroke="#3b82f6" strokeWidth={2} name="Transactions" />
            <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} name="Amount ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
