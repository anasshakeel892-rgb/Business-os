export default async function handler(req, res) {
  const { message, agentId } = req.body

  const key = process.env.GEMINI_API_KEY

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`

  const body = {
    contents: [{
      parts: [{
        text: `You are a business AI agent for ${agentId}. Answer this: ${message}`
      }]
    }]
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const d = await r.json()
    const reply = d?.candidates?.[0]?.content?.parts?.[0]?.text
    if (reply) {
      res.status(200).json({ reply })
    } else {
      res.status(200).json({ reply: JSON.stringify(d) })
    }
  } catch (e) {
    res.status(200).json({ reply: e.message })
  }
        }
