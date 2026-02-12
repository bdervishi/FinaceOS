import { createServerSupabaseClient } from '@/lib/admin'

export default async function AdminLogsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: adminActions } = await supabase
    .from('admin_actions')
    .select(`
      *,
      admin:profiles!admin_id(full_name, email),
      target_user:profiles!target_user_id(full_name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Activity Logs</h1>
        <p className="text-slate-500 mt-1">Track all admin actions and user activities</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Admin</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Target User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {adminActions?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No admin actions recorded yet
                  </td>
                </tr>
              ) : (
                adminActions?.map((action: any) => (
                  <tr key={action.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {action.admin?.full_name || 'Unknown Admin'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {action.admin?.email || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {action.action_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {action.target_user ? (
                        <p className="text-sm text-slate-900">
                          {action.target_user.full_name || 'Unknown'}
                        </p>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {action.description || action.metadata?.reason || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(action.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
