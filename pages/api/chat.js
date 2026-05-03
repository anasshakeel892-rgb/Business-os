export default async function handler(req, res) {
  const { message, agentId } = req.body

  const personalities = {
    hr: 'You are an HR Department AI agent. You handle team management, recruitment, performance reviews and tasks. Be professional and helpful.',
    sales: 'You are a Sales Department AI agent. You handle leads, proposals, pipeline and deal tracking. Be energetic and results focused.',
    operations: 'You are an Operations AI agent. You handle project workflows, client delivery and processes. Be precise and efficient.',
    marketing: 'You are a Marketing AI agent. You handle Instagram, content strategy and growth. Be creative and data driven.',
    finance: 'You are a Finance AI agent. You handle budgets, invoices and expenses. Be accurate and analytical.',
    support: 'You are a Customer Support AI agent. You handle client queries, tickets and satisfaction. Be empathetic and solution focused.',
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: personalities[agentId] + '\n\nUser: ' + message }] }
          ],
          generationConfig: { temperature: 0.8, maxOutputTokens: 500 }
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
