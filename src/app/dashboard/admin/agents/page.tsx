'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Bot, Play, Pause, Settings, Terminal, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: string
  description: string | null
  status: string
  config: any
  last_action: string | null
  last_action_at: string | null
  created_at: string
}

interface AgentAction {
  id: string
  agent_id: string
  action: string
  input: any
  output: any
  status: string
  executed_at: string
}

export default function AdminAgentsPage() {
  const supabase = createClient()
  const [agents, setAgents] = useState<Agent[]>([])
  const [agentActions, setAgentActions] = useState<AgentAction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showConfig, setShowConfig] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [agentsData, actionsData] = await Promise.all([
      supabase.from('agents').select('*').order('created_at', { ascending: false }),
      supabase.from('agent_actions').select('*').order('executed_at', { ascending: false }).limit(20)
    ])

    if (agentsData.data) setAgents(agentsData.data)
    if (actionsData.data) setAgentActions(actionsData.data)
    setLoading(false)
  }

  const toggleAgentStatus = async (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'paused' : 'active'
    await supabase.from('agents').update({ status: newStatus }).eq('id', agent.id)
    await logAgentAction(agent.id, 'status_change', { newStatus })
    fetchData()
  }

  const logAgentAction = async (agentId: string, action: string, input: any = {}) => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('agent_actions').insert({
      agent_id: agentId,
      action,
      input,
      output: {},
      status: 'completed',
      executed_by: user?.id
    })
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      paused: 'bg-amber-100 text-amber-700',
      error: 'bg-red-100 text-red-700'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>
        {status}
      </span>
    )
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      business: Bot,
      development: Terminal,
      testing: CheckCircle,
      marketing: Bot,
      sales: Bot,
      finance: Bot,
      operations: Settings,
      security: AlertCircle
    }
    const Icon = icons[type] || Bot
    return <Icon className="h-5 w-5" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Agent Management</h1>
          <p className="text-slate-500 mt-1">Manage AI agents and their activities</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">
          <Plus className="h-5 w-5" />
          Add Agent
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  {getTypeIcon(agent.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{agent.name}</h3>
                  <p className="text-xs text-slate-500">{agent.type}</p>
                </div>
              </div>
              {getStatusBadge(agent.status)}
            </div>

            <p className="text-sm text-slate-600 mb-4">{agent.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAgentStatus(agent)}
                  className={`p-2 rounded-lg transition-colors ${
                    agent.status === 'active'
                      ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                      : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                  }`}
                >
                  {agent.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => { setSelectedAgent(agent); setShowConfig(true); }}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-slate-500">
                Last action: {agent.last_action_at ? new Date(agent.last_action_at).toLocaleString() : 'Never'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Agent Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Agent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Agent</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Executed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {agentActions.map((action) => {
                const agent = agents.find(a => a.id === action.agent_id)
                return (
                  <tr key={action.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{agent?.name || 'Unknown'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{action.action}</td>
                    <td className="px-4 py-3">
                      {action.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(action.executed_at).toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
