import { createServerSupabaseClient } from '@/lib/admin'

export default async function AdminOverviewPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch stats without count() to avoid TypeScript issues
  const [totalUsers, activeUsers, bannedUsers, totalAgents, adminCount, recentActions] = await Promise.all([
    supabase.from('profiles').select('id'),
    supabase.from('profiles').select('id').eq('is_banned', false),
    supabase.from('profiles').select('id').eq('is_banned', true),
    supabase.from('agents').select('id'),
    supabase.from('profiles').select('id').in('role', ['admin', 'super_admin']),
    supabase.from('admin_actions').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Users</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{totalUsers.data?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Active Users</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{activeUsers.data?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Banned Users</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{bannedUsers.data?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Active Agents</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{totalAgents.data?.length || 0}</p>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/dashboard/admin/users" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <p className="font-medium text-slate-900">Manage Users</p>
              <p className="text-sm text-slate-500">View and ban users</p>
            </a>
            <a href="/dashboard/admin/agents" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <p className="font-medium text-slate-900">Manage Agents</p>
              <p className="text-sm text-slate-500">Configure AI agents</p>
            </a>
            <a href="/dashboard/admin/logs" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <p className="font-medium text-slate-900">View Logs</p>
              <p className="text-sm text-slate-500">Activity history</p>
            </a>
            <a href="/dashboard/admin/settings" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <p className="font-medium text-slate-900">Settings</p>
              <p className="text-sm text-slate-500">System configuration</p>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Admin Actions</h2>
          <div className="space-y-4">
            {recentActions.data?.length === 0 ? (
              <p className="text-slate-500 text-sm">No recent actions</p>
            ) : (
              recentActions.data?.map((action: any) => (
                <div key={action.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{action.action_type}</p>
                    <p className="text-xs text-slate-500">{new Date(action.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
