'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function DebugPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profileData)
      }

      setLoading(false)
    }

    check()
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Info</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">User</h2>
        <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(profile, null, 2)}
        </pre>
      </div>

      {profile?.role === 'super_admin' && (
        <a href="/dashboard/admin" className="inline-block mt-4 bg-emerald-500 text-white px-6 py-3 rounded-lg">
          Go to Admin Panel
        </a>
      )}
    </div>
  )
}
