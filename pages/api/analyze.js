export default async function handler(req, res) {
  const { agentId, agentName } = req.body
  const key = process.env.GROQ_API_KEY

  const fallback = {
    hr: { priority: 'HIGH', title: 'Recruit at least one AI consultant', description: 'No team means inability to deliver on client projects. Start hiring immediately.' },
    sales: { priority: 'HIGH', title: 'Create outreach campaign to 20 prospects', description: 'Empty pipeline means zero revenue next month. Launch outreach today.' },
    operations: { priority: 'HIGH', title: 'Establish project intake workflows', description: 'No operational infrastructure to manage incoming work. Build SOPs now.' },
    marketing: { priority: 'HIGH', title: 'Publish 3 AI consulting posts on LinkedIn', description: 'Zero visibility makes lead generation extremely difficult. Start posting daily.' },
    finance: { priority: 'MEDIUM', title: 'Set up accounting and expense tracking', description: 'No financial visibility makes cash flow impossible to manage.' },
    support: { priority: 'MEDIUM', title: 'Create client onboarding templates', description: 'Lack of process leads to poor client experience and churn.' },
    analytics: { priority: 'HIGH', title: 'Build weekly metrics dashboard', description: 'No data visibility means decisions made without insights.' },
    leads: { priority: 'HIGH', title: 'Research and build list of 50 prospects', description: 'No leads means business growth is completely stalled.' },
  }

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { 
            role: 'system', 
            content: 'You are a business AI agent. You must respond ONLY in valid JSON format. No extra text, no markdown, no explanation. Just raw JSON.' 
          },
          { 
            role: 'user', 
            content: `You are the ${agentName} agent for a growing business. Analyze the current business situation and propose the single most urgent task that needs immediate attention. Respond ONLY in this exact JSON format with no other text: {"priority":"HIGH","title":"specific task title under 10 words","description":"clear reason why this is urgent in one sentence"}` 
          }
        ],
        max_tokens: 200,
        temperature: 0.5
      })
    })
    const d = await r.json()
    const text = d?.choices?.[0]?.message?.content
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
