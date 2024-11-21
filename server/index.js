import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'  // 修改这行

dotenv.config()

const app = express()

// 配置CORS和JSON解析
app.use(cors())
app.use(express.json())

// 配置OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // 修改这部分
})

// AI咨询接口
app.post('/api/ai-consultation', async (req, res) => {
  try {
    const { question, hexagram, hexagramName, interpretation, language } = req.body

    // 根据语言选择对应的 prompt
    const prompts = {
      zh: {
        title: "总体分析",
        advice: "具体建议",
       
      },
      en: {
        title: "Overall Analysis",
        advice: "Specific Advice",
      
      },
      fr: {
        title: "Analyse Générale",
        advice: "Conseils Spécifiques",
      
      }
    }

    const currentLang = prompts[language] || prompts.en // 默认使用英语

    const systemPrompt = `You are a professional I Ching divination master. Please respond in ${language === 'zh' ? 'Chinese' : language === 'fr' ? 'French' : 'English'} and follow this format:

【${currentLang.title}】
Analyze the hexagram's implications for the question

【${currentLang.advice}】
Provide 1-2 specific suggestions


Please ensure each section is separated by line breaks, and each point starts on a new line for better readability.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Based on Hexagram ${hexagram} "${hexagramName}": ${interpretation}
Please analyze and provide advice for the question: "${question}".
Incorporate relevant I Ching wisdom and provide in-depth interpretation. Focus on the implication of the hexagram. Do not provide too general advice.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })

    // 处理返回的文本
    const formattedResponse = completion.choices[0].message.content
      .replace(/【/g, '\n【')
      .replace(/】/g, '】\n')
      .trim()

    res.json({ response: formattedResponse })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ error: '获取解析失败，请稍后重试' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`后端服务运行在端口 ${PORT}`)
})