import { useState } from 'react'
import AgentCard from '../components/AgentCard'
import TaskQueue from '../components/TaskQueue'
import CEOAgent from '../components/CEOAgent'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const agents = [
    { id: 'hr', name: 'HR Department', description: 'Team management, performance, tasks', color: '#a855f7' },
    { id: 'sales', name: 'Sales Department', description: 'Leads pipeline, proposals, deal tracking', color: '#22c55e' },
    { id: 'operations', name: 'Operations', description: 'Project workflow, client delivery', color: '#f97316' },
    { id: 'marketing', name: 'Marketing', description: 'Instagram, content strategy, growth', color: '#ec4899' },
    { id: 'finance', name: 'Finance', description: 'Budget tracking, invoices, expenses', color: '#3b82f6' },
    { id: 'support', name: 'Customer Support', description: 'Client queries, tickets, satisfaction', color: '#eab308' },
    { id: 'analytics', name: 'Analytics', description: 'Data insights, reports, business metrics', color: '#06b6d4' },
    { id: 'leads', name: 'Lead Generator', description: 'Prospect research, outreach, conversion', color: '#f43f5e' },
  ]

  const runAnalysis = async () => {
    setLoading(true)
    const newTasks = []
    for (const agent of agents) {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: agent.id, agentName: agent.name }),
      })
      const data = await res.json()
      newTasks.push({
        id: Math.random().toString(36).substr(2, 9),
        department: agent.name,
        color: agent.color,
        priority: data.priority,
        title: data.title,
        description: data.description,
        status: 'awaiting',
      })
    }
    setTasks(newTasks)
    setLoading(false)
  }

  const approveTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'running' } : t))
  }

  const rejectTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen p-4" style={{ background: '#0a0a0f' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <CEOAgent onRun={runAnalysis} loading={loading} />
        <TaskQueue tasks={tasks} onApprove={approveTask} onReject={rejectTask} />
        <div className="mt-6">
          <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>DEPARTMENT AGENTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {agents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isWorking={tasks.some(t => t.department === agent.name && t.status === 'running')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
          }
