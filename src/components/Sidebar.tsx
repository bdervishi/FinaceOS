'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PieChart, CreditCard, TrendingUp, Settings, LogOut, Wallet, User } from 'lucide-react'
import { clsx } from 'clsx'
import { createClient } from '@/lib/supabase'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: TrendingUp },
  { name: 'Accounts', href: '/dashboard/accounts', icon: Wallet },
  { name: 'Transactions', href: '/dashboard/transactions', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: PieChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface User {
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
  email?: string
}

interface SidebarProps {
  user?: User
}

export default function Sidebar({ user: initialUser }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(initialUser || null)
  const [loading, setLoading] = useState(!initialUser)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user as User | null)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name
    if (user?.email) return user.email.split('@')[0]
    return 'Demo User'
  }

  const getUserEmail = () => {
    if (user?.email) return user.email
    return 'demo@financeos.app'
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white w-64">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
          <Wallet className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold">FinanceOS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="User" className="h-10 w-10 rounded-full" />
            ) : (
              <User className="h-5 w-5 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {loading ? 'Loading...' : getUserDisplayName()}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {loading ? '...' : getUserEmail()}
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
