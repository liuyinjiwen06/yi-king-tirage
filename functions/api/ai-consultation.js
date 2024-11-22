import OpenAI from 'openai';

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const { question, hexagram, hexagramName, interpretation, language } = await request.json();

    // 配置 OpenAI
    const openai = new OpenAI({
      apiKey: context.env.OPENAI_API_KEY
    });

    // 根据语言选择对应的 prompt
    const prompts = {
      zh: {
        role: "你是一位专业的易经解卦师，精通易经卦象分析和人生指导。请用中文回答。",
        format: `基于第${hexagram}卦《${hexagramName}》的解释：${interpretation}，
                请针对用户的具体问题："${question}"
                给出详细的分析和建议。请从易经哲学的角度进行解答，
                并结合现代生活实际情况给出具体可行的建议。`
      },
      en: {
        role: "You are a professional I Ching divination master. Please respond in English.",
        format: `Based on Hexagram ${hexagram} "${hexagramName}": ${interpretation}
                Please analyze and provide advice for the question: "${question}"
                Please provide insights from I Ching philosophy and practical advice for modern life.`
      },
      fr: {
        role: "Vous êtes un maître professionnel de la divination I Ching. Veuillez répondre en français.",
        format: `Basé sur l'Hexagramme ${hexagram} "${hexagramName}": ${interpretation}
                Veuillez analyser et donner des conseils pour la question: "${question}"
                Veuillez fournir des perspectives de la philosophie I Ching et des conseils pratiques pour la vie moderne.`
      }
    };

    const currentLang = prompts[language] || prompts.en;
    console.log('Selected language:', language); // 添加调试日志
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: currentLang.role
        },
        {
          role: "user",
          content: currentLang.format
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return new Response(JSON.stringify({ 
      response: completion.choices[0].message.content 
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ 
      error: '获取解析失败，请稍后重试' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// 处理 OPTIONS 请求（用于 CORS 预检）
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}