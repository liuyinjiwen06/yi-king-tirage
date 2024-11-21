import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  })

const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question, hexagram, hexagramName, interpretation } = req.body

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一位专业的易经解卦师，精通易经卦象分析和人生指导。"
        },
        {
          role: "user",
          content: `基于第${hexagram}卦《${hexagramName}》的解释：${interpretation}，
                    请针对用户的具体问题："${question}"
                    给出详细的分析和建议。请从易经哲学的角度进行解答，
                    并结合现代生活实际情况给出具体可行的建议。`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    return res.status(200).json({ 
      response: completion.data.choices[0].message.content 
    })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return res.status(500).json({ 
      error: 'Failed to get AI response' 
    })
  }
}