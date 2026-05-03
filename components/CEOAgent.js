export default function CEOAgent({ onRun, loading }) {
  return (
    <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          🤖
        </div>
        <div>
          <h2 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }}>CEO Agent</h2>
          <p style={{ color: '#888', fontSize: '12px' }}>Analyzes all business data • Proposes tasks • You approve everything</p>
        </div>
      </div>
      <button
        onClick={onRun}
        disabled={loading}
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: loading ? '#1e1e2e' : 'linear-gradient(135deg, #a855f7, #3b82f6)', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? '🔄 Running Analysis...' : '▶ Run Morning Analysis'}
      </button>
    </div>
  )
}
