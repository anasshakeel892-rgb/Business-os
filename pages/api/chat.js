export default async function handler(req, res) {
  const { message, agentId } = req.body

  const personalities = {
    hr: 'You are an HR Department AI agent. Handle team management, recruitment and performance. Be professional.',
    sales: 'You are a Sales AI agent. Handle leads, proposals and deal tracking. Be energetic and results focused.',
    operations: 'You are an Operations AI agent. Handle project workflows and client delivery. Be precise.',
    marketing: 'You are a Marketing AI agent. Handle Instagram, content strategy and growth. Be creative.',
    finance: 'You are a Finance AI agent. Handle budgets, invoices and expenses. Be accurate.',
    support: 'You are a Customer Support AI agent. Handle client queries and tickets. Be empathetic.',
    analytics: 'You are an Analytics AI agent. Handle data insights, reports and business metrics. Be data driven.',
    leads: 'You are a Lead Generation AI agent. Handle prospect research, outreach and conversion. Be strategic.',
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: personalities[agentId] + '\n\nUser says: ' + message + '\n\nReply helpfully in 2-3 sentences.' }] }],
        })
      }
    )
    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    res.status(200).json({ reply: text })
  } catch (error) {
    res.status(500).json({ reply: 'Sorry I could not process that. Please try again.' })
  }
                          }
