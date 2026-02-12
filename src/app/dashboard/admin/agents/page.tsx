'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Bot, Play, Pause, Settings, Terminal, Plus, CheckCircle, XCircle, AlertCircle, ChevronRight, Zap } from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: string
  description: string | null
  status: string
  config: any
  last_action: string | null
  last_action_at: string | null
  capabilities: string[] | null
}

interface Task {
  id: string
  agent_id: string
  task_type: string
  input: any
  output: any
  status: string
  created_at: string
  completed_at: string | null
}

export default function AdminAgentsPage() {
  const supabase = createClient()
  const [agents, setAgents] = useState<Agent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [taskType, setTaskType] = useState('')
  const [taskInput, setTaskInput] = useState('')
  const [creatingTask, setCreatingTask] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [agentsData, tasksData] = await Promise.all([
      supabase.from('agents').select('*').order('created_at', { ascending: false }),
      supabase.from('agent_actions').select('*').order('created_at', { ascending: false }).limit(20)
    ])

    if (agentsData.data) setAgents(agentsData.data)
    if (tasksData.data) setTasks(tasksData.data.map(t => ({
      id: t.id,
      agent_id: t.agent_id,
      task_type: t.action,
      input: t.input,
      output: t.output,
      status: t.status,
      created_at: t.executed_at || t.created_at,
      completed_at: t.status === 'completed' ? (t.executed_at || t.created_at) : null
    })))
    setLoading(false)
  }

  const toggleAgentStatus = async (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'paused' : 'active'
    await supabase.from('agents').update({ status: newStatus }).eq('id', agent.id)
    fetchData()
  }

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAgent || !newTask || !taskType) return

    setCreatingTask(true)
    try {
      const output = await simulateAgentTask(selectedAgent, taskType, taskInput || newTask)

      await supabase.from('agent_actions').insert({
        agent_id: selectedAgent.id,
        action: taskType,
        input: { task: newTask, details: taskInput },
        output: output,
        status: 'completed'
      })

      await supabase.from('agents').update({ 
        status: 'active',
        last_action: taskType,
        last_action_at: new Date().toISOString()
      }).eq('id', selectedAgent.id)

      setShowTaskModal(false)
      setNewTask('')
      setTaskType('')
      setTaskInput('')
      fetchData()
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setCreatingTask(false)
    }
  }

  const simulateAgentTask = async (agent: Agent, taskType: string, task: string): Promise<any> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    await delay(2000)

    const responses: Record<string, any> = {
      'analyze_business': {
        summary: 'Business Analysis Complete',
        findings: ['Market opportunity: $2.5B TAM', 'Key competitors: 3 major players', 'Projected ROI: 340%'],
        recommendations: ['Focus on SMB segment', 'Invest in customer success']
      },
      'write_code': {
        summary: 'Code Generation Complete',
        files_created: ['src/components/NewFeature.tsx', 'src/lib/api.ts'],
        lines_of_code: 450,
        quality_score: 'A+',
        tests_included: true
      },
      'unit_tests': {
        summary: 'Test Coverage Report',
        tests_written: 23,
        tests_passed: 23,
        coverage: '94.5%',
        critical_issues: 0
      },
      'gtm_strategy': {
        summary: 'Go-to-Market Strategy',
        phases: [
          { name: 'Pre-launch', duration: '4 weeks', activities: ['Teaser campaign', 'Waitlist', 'Influencer outreach'] },
          { name: 'Launch', duration: '8 weeks', activities: ['Product launch event', 'PR push', 'Paid ads'] },
          { name: 'Growth', duration: '12 weeks', activities: ['Referral program', 'Content marketing'] }
        ],
        budget_recommendation: '$150K'
      },
      'roi_analysis': {
        summary: 'ROI Analysis Complete',
        investment_required: '$500K',
        projected_revenue_y1: '$1.2M',
        break_even: '18 months',
        npv: '$3.2M'
      },
      'vulnerability_scan': {
        summary: 'Security Assessment',
        vulnerabilities_found: 2,
        critical: 0,
        high: 1,
        recommendations: ['Update dependencies', 'Implement rate limiting']
      }
    }

    return responses[taskType] || {
      summary: 'Task Completed',
      task: task,
      status: 'Successfully executed',
      timestamp: new Date().toISOString()
    }
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      paused: 'bg-amber-100 text-amber-700',
      completed: 'bg-blue-100 text-blue-700'
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{status}</span>
  }

  const getCapabilityBadge = (cap: string) => (
    <span key={cap} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700">{cap.replace(/_/g, ' ')}</span>
  )

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
          <p className="text-slate-500 mt-1">Manage AI agents and assign tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{agent.name}</h3>
                  <p className="text-xs text-slate-500 capitalize">{agent.type}</p>
                </div>
              </div>
              {getStatusBadge(agent.status)}
            </div>

            <p className="text-sm text-slate-600 mb-4">{agent.description}</p>

            {agent.capabilities && (
              <div className="flex flex-wrap gap-1 mb-4">
                {agent.capabilities.slice(0, 4).map(getCapabilityBadge)}
                {agent.capabilities.length > 4 && <span className="text-xs text-slate-400">+{agent.capabilities.length - 4} more</span>}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleAgentStatus(agent)} className={`p-2 rounded-lg transition-colors ${agent.status === 'active' ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}>
                  {agent.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button onClick={() => { setSelectedAgent(agent); setShowTaskModal(true); }} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">
                  <Zap className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-slate-500">
                {agent.last_action_at ? `Last: ${new Date(agent.last_action_at).toLocaleDateString()}` : 'Never'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Agent Activity</h2>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-slate-500 text-sm">No tasks executed yet. Click on an agent to assign a task.</p>
          ) : (
            tasks.map((task) => {
              const agent = agents.find(a => a.id === task.agent_id)
              return (
                <div key={task.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {task.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{agent?.name || 'Unknown'}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{task.task_type.replace(/_/g, ' ')}</span>
                    </div>
                    {task.input?.task && <p className="text-sm text-slate-500 mt-1">{task.input.task}</p>}
                    {task.output?.summary && <p className="text-sm text-emerald-600 mt-2 font-medium">{task.output.summary}</p>}
                    <p className="text-xs text-slate-400 mt-2">{new Date(task.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {showTaskModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Assign Task to {selectedAgent.name}</h3>
                <p className="text-sm text-slate-500 capitalize">{selectedAgent.type} Agent</p>
              </div>
            </div>

            <form onSubmit={createTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Task Type</label>
                <select value={taskType} onChange={(e) => setTaskType(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                  <option value="">Select task type...</option>
                  {selectedAgent.capabilities?.map(cap => <option key={cap} value={cap}>{cap.replace(/_/g, ' ')}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Task Description</label>
                <textarea value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder={`What should ${selectedAgent.name} do?`} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Details (optional)</label>
                <textarea value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Any specific requirements..." className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={2} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowTaskModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={creatingTask} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 flex items-center gap-2">
                  {creatingTask ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>Executing...</> : <><Zap className="h-4 w-4" />Execute Task</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
