export default function TaskQueue({ tasks, onApprove, onReject }) {
  const awaiting = tasks.filter(t => t.status === 'awaiting')
  const running = tasks.filter(t => t.status === 'running')

  if (tasks.length === 0) return (
    <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
      <h2 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>TASK QUEUE</h2>
      <p style={{ color: '#888', fontSize: '13px' }}>No tasks yet. Run CEO Analysis to start.</p>
    </div>
  )

  return (
    <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <h2 style={{ color: '#fff', fontWeight: 'bold' }}>TASK QUEUE</h2>
        {awaiting.length > 0 && (
          <span style={{ background: '#f97316', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '999px', fontWeight: 'bold' }}>
            {awaiting.length} awaiting approval
          </span>
        )}
      </div>

      {running.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          {running.map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', background: '#0a0a0f', marginBottom: '6px' }}>
              <span style={{ background: '#22c55e', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>RUNNING</span>
              <span style={{ background: task.color + '33', color: task.color, fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>{task.department}</span>
              <span style={{ color: '#fff', fontSize: '12px', flex: 1 }}>{task.title}</span>
            </div>
          ))}
        </div>
      )}

      {awaiting.map(task => (
        <div key={task.id} style={{ padding: '10px', borderRadius: '8px', background: '#0a0a0f', marginBottom: '8px', border: '1px solid #1e1e2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ background: task.priority === 'HIGH' ? '#ef4444' : '#f97316', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{task.priority}</span>
            <span style={{ background: task.color + '33', color: task.color, fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>{task.department}</span>
          </div>
          <p style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{task.title}</p>
          <p style={{ color: '#888', fontSize: '11px', marginBottom: '8px' }}>{task.description}</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => onApprove(task.id)} style={{ flex: 1, padding: '6px', borderRadius: '6px', border: 'none', background: '#22c55e', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              ✓ Approve
            </button>
            <button onClick={() => onReject(task.id)} style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '12px', cursor: 'pointer' }}>
              ✕ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
