export default async function handler(req, res) {
  const { message, agentId } = req.body
  const key = process.env.GROQ_API_KEY

  const personalities = {
    hr: 'You are an HR Department AI agent. Handle team management, recruitment and performance. Be professional.',
    sales: 'You are a Sales AI agent. Handle leads, proposals and deal tracking. Be energetic.',
    operations: 'You are an Operations AI agent. Handle project workflows and client delivery. Be precise.',
    marketing: 'You are a Marketing AI agent. Handle Instagram, content strategy and growth. Be creative.',
    finance: 'You are a Finance AI agent. Handle budgets, invoices and expenses. Be accurate.',
    support: 'You are a Customer Support AI agent. Handle client queries and tickets. Be empathetic.',
    analytics: 'You are an Analytics AI agent. Handle data insights and business metrics. Be data driven.',
    leads: 'You are a Lead Generation AI agent. Handle prospect research and outreach. Be strategic.',
  }

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: personalities[agentId] || 'You are a business AI agent.' },
          { role: 'user', content: message }
        ],
        max_tokens: 300
      })
    })
    const d = await r.json()
    const reply = d?.choices?.[0]?.message?.content
    res.status(200).json({ reply: reply || JSON.stringify(d) })
  } catch (e) {
    res.status(200).json({ reply: e.message })
  }
      }
