export default async function handler(req, res) {
  const { agentId, agentName } = req.body
  const key = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${key}`

  const fallback = {
    hr: { priority: 'HIGH', title: 'Recruit at least one AI consultant', description: 'No team means inability to deliver on client projects.' },
    sales: { priority: 'HIGH', title: 'Create outreach campaign to 20 prospects', description: 'Empty pipeline means zero revenue next month.' },
    operations: { priority: 'HIGH', title: 'Establish project intake workflows', description: 'No operational infrastructure to manage incoming work.' },
    marketing: { priority: 'HIGH', title: 'Publish 3 AI consulting posts on LinkedIn', description: 'Zero visibility makes lead generation extremely difficult.' },
    finance: { priority: 'MEDIUM', title: 'Set up accounting and expense tracking', description: 'No financial visibility makes cash flow impossible to manage.' },
    support: { priority: 'MEDIUM', title: 'Create client onboarding templates', description: 'Lack of process leads to poor client experience.' },
    analytics: { priority: 'HIGH', title: 'Build weekly metrics dashboard', description: 'No data visibility means decisions made without insights.' },
    leads: { priority: 'HIGH', title: 'Research and build list of 50 prospects', description: 'No leads means business growth is completely stalled.' },
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are the ${agentName} AI agent. Propose one urgent business task. Respond ONLY in JSON: {"priority":"HIGH","title":"task title","description":"reason"}`
          }]
        }]
      })
    })
    const d = await r.json()
    const text = d?.candidates?.[0]?.content?.parts?.[0]?.text
    if (text) {
      const clean = text.replace(/```json|```/g, '').trim()
      res.status(200).json(JSON.parse(clean))
    } else {
      res.status(200).json(fallback[agentId])
    }
  } catch (e) {
    res.status(200).json(fallback[agentId])
  }
            }
