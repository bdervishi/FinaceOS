import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Shield, Users, Bot, FileText, Settings, LogOut, Wallet } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/admin'

const adminNav = [
  { name: 'Overview', href: '/dashboard/admin', icon: Shield },
  { name: 'Users', href: '/dashboard/admin/users', icon: Users },
  { name: 'Agents', href: '/dashboard/admin/agents', icon: Bot },
  { name: 'Activity Logs', href: '/dashboard/admin/logs', icon: FileText },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    redirect('/dashboard')
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Admin Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">FinanceOS</span>
          </Link>
          <div className="mt-2 px-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
              <Shield className="h-3 w-3" />
              Admin Panel
            </span>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3">
          <div className="space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-3 border-t border-slate-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Settings className="h-5 w-5" />
            Back to Dashboard
          </Link>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
