'use server'

import { GoogleGenAI } from '@google/genai'

export async function generateQuestion(formData: FormData) {
    const profession = formData.get('profession') as string
    const level = formData.get('level') as string
    const stackRaw = formData.get('stack') as string

    if (!profession || !level || !stackRaw) {
        throw new Error('Eksik veri gönderildi.')
    }

    const stackObj = JSON.parse(stackRaw)
    const stackArray = Object.values(stackObj).flat()

    const prompt = `
Meslek: ${profession}
Seviye: ${level}
Tech Stack: ${stackArray.join(', ')}

Lütfen bu bilgilere göre 5 adet çoktan seçmeli soru üret.
Her soru JSON formatında şu yapıda olmalı:
[
  {
    "id": "string",
    "text": "Soru metni",
    "options": ["A", "B", "C", "D"],
    "hint": "İpucu metni",
    "correctAnswerIndex": 0
  },
  ...
]
Sadece JSON çıktısı ver.
  `

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    const result = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
    })

    const cleaned = result.text?.trim().replace(/```json|```/g, '') || '[]'
    const questions = JSON.parse(cleaned)

    return { questions, profession, level, stack: stackArray }
}
