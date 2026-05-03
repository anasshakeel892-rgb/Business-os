import { useRouter } from 'next/router'

export default function AgentCard({ agent, isWorking }) {
  const router = useRouter()
  const status = isWorking ? 'WORKING' : 'IDLE'
  const statusColor = isWorking ? '#22c55e' : '#888'

  return (
    <div style={{ background: '#12121a', border: `1px solid ${agent.color}33`, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: agent.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
          🤖
        </div>
        <span style={{ color: statusColor, fontSize: '10px', fontWeight: 'bold' }}>● {status}</span>
      </div>
      <div>
        <h3 style={{ color: agent.color, fontWeight: 'bold', fontSize: '13px' }}>{agent.name}</h3>
        <p style={{ color: '#888', fontSize: '11px', marginTop: '4px' }}>{agent.description}</p>
      </div>
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
        <button
          onClick={() => router.push(`/agent/${agent.id}`)}
          style={{ flex: 1, padding: '6px', borderRadius: '6px', border: `1px solid ${agent.color}`, background: 'transparent', color: agent.color, fontSize: '11px', cursor: 'pointer' }}
        >
          Open →
        </button>
        <button
          onClick={() => router.push(`/agent/${agent.id}?chat=true`)}
          style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #1e1e2e', background: 'transparent', color: '#888', fontSize: '11px', cursor: 'pointer' }}
        >
          Chat
        </button>
      </div>
    </div>
  )
}
