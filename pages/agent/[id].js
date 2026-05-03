import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AgentPage() {
  const router = useRouter()
  const { id } = router.query
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const agents = {
    hr: { name: 'HR Department', color: '#a855f7', emoji: '👥', description: 'Team management, performance, tasks' },
    sales: { name: 'Sales Department', color: '#22c55e', emoji: '💰', description: 'Leads pipeline, proposals, deal tracking' },
    operations: { name: 'Operations', color: '#f97316', emoji: '⚙️', description: 'Project workflow, client delivery' },
    marketing: { name: 'Marketing', color: '#ec4899', emoji: '📱', description: 'Instagram, content strategy, growth' },
    finance: { name: 'Finance', color: '#3b82f6', emoji: '💳', description: 'Budget tracking, invoices, expenses' },
    support: { name: 'Customer Support', color: '#eab308', emoji: '🎧', description: 'Client queries, tickets, satisfaction' },
  }

  const agent = agents[id] || agents.hr

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, agentId: id })
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: 'agent', text: data.reply }])
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#12121a', borderBottom: '1px solid #1e1e2e', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => router.push('/')} style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '20px', cursor: 'pointer' }}>←</button>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: agent.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          {agent.emoji}
        </div>
        <div>
          <h1 style={{ color: agent.color, fontWeight: 'bold', fontSize: '16px' }}>{agent.name}</h1>
          <p style={{ color: '#888', fontSize: '11px' }}>{agent.description}</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{agent.emoji}</div>
            <p style={{ fontSize: '14px' }}>Chat with {agent.name}</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Ask me anything about {agent.description}</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? agent.color : '#12121a',
              color: '#fff',
              fontSize: '13px',
              border: msg.role === 'agent' ? '1px solid #1e1e2e' : 'none'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: '18px 18px 18px 4px', background: '#12121a', border: '1px solid #1e1e2e', color: '#888', fontSize: '13px' }}>
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '16px', background: '#12121a', borderTop: '1px solid #1e1e2e', display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={`Ask ${agent.name} anything...`}
          style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #1e1e2e', background: '#0a0a0f', color: '#fff', fontSize: '13px', outline: 'none' }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ padding: '12px 16px', borderRadius: '10px', border: 'none', background: agent.color, color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
