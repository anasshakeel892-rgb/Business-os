export default async function handler(req, res) {
  const { agentId, agentName } = req.body

  const prompts = {
    hr: 'You are an HR agent. Propose one urgent HR task for a business. Respond in JSON only: {"priority":"HIGH","title":"task title","description":"brief reason why this is urgent"}',
    sales: 'You are a Sales agent. Propose one urgent sales task. Respond in JSON only: {"priority":"HIGH","title":"task title","description":"brief reason why this is urgent"}',
    operations: 'You are an Operations agent. Propose one urgent operations task. Respond in JSON only: {"priority":"HIGH","title":"task title","description":"brief reason why this is urgent"}',
    marketing: 'You are a Marketing agent. Propose one urgent marketing task. Respond in JSON only: {"priority":"HIGH","title":"task title","description":"brief reason why this is urgent"}',
    finance: 'You are a Finance agent. Propose one urgent finance task. Respond in JSON only: {"priority":"MEDIUM","title":"task title","description":"brief reason why this is urgent"}',
    support: 'You are a Support agent. Propose one urgent support task. Respond in JSON only: {"priority":"MEDIUM","title":"task title","description":"brief reason why this is urgent"}',
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompts[agentId] }] }],
          generationConfig: { temperature: 0.7 }
        })
      }
    )

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    res.status(200).json(parsed)
  } catch (error) {
    res.status(200).json({
      priority: 'HIGH',
      title: `${agentName} needs attention`,
      description: 'Agent analysis failed. Please review manually.'
    })
  }
}
