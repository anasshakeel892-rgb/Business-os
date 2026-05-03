export default async function handler(req, res) {
  const { agentId, agentName } = req.body

  const tasks = {
    hr: { priority: 'HIGH', title: 'Recruit or contract at least one AI consultant', description: 'No team means inability to deliver on any client projects this quarter.' },
    sales: { priority: 'HIGH', title: 'Create and execute outreach campaign to 20 prospects', description: 'Empty pipeline means zero revenue next month if not addressed immediately.' },
    operations: { priority: 'HIGH', title: 'Establish project intake and invoicing workflows', description: 'No operational infrastructure exists to manage incoming work efficiently.' },
    marketing: { priority: 'HIGH', title: 'Publish 3 AI consulting thought leadership posts', description: 'Zero visibility will make lead generation extremely difficult going forward.' },
    finance: { priority: 'MEDIUM', title: 'Set up accounting and expense tracking system', description: 'No financial visibility makes it impossible to manage business cash flow.' },
    support: { priority: 'MEDIUM', title: 'Create client onboarding and communication templates', description: 'Lack of process will lead to poor client experience and churn.' },
    analytics: { priority: 'HIGH', title: 'Build business metrics dashboard and weekly report', description: 'No data visibility means decisions are being made without any insights.' },
    leads: { priority: 'HIGH', title: 'Research and build list of 50 qualified prospects', description: 'No leads in pipeline means business growth is completely stalled.' },
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are the ${agentName} AI agent. Propose one urgent task. Respond ONLY in JSON format like this: {"priority":"HIGH","title":"task title here","description":"reason here"}` }] }],
        })
      }
    )
    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    res.status(200).json(parsed)
  } catch (error) {
    res.status(200).json(tasks[agentId])
  }
  }
