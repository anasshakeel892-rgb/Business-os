export default async function handler(req, res) {
  const { message, agentId } = req.body
  const key = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${key}`

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a business AI agent for ${agentId} department. Answer professionally: ${message}`
          }]
        }]
      })
    })
    const d = await r.json()
    const reply = d?.candidates?.[0]?.content?.parts?.[0]?.text
    res.status(200).json({ reply: reply || JSON.stringify(d) })
  } catch (e) {
    res.status(200).json({ reply: e.message })
  }
      }
