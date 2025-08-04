import { NextRequest, NextResponse } from "next/server";
require('dotenv').config();
import { GoogleGenAI } from "@google/genai"; // Corrected import for GoogleGenerativeAI

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Corrected instantiation
interface Prompt {
    promptAnswer: string
}
export async function GET(request: Request) {
    const data = await request.json(); // This part will likely throw an error for a GET request if no body is sent. Consider if you truly need to parse JSON for GET.
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const requestedArea = body.inputValue;
        const level = body.level;

        console.log("İstenen Alan:", requestedArea);
        console.log("Seviye:", level);

        if (
            !requestedArea ||
            typeof requestedArea !== "string" ||
            !level ||
            typeof level !== "string"
        ) {
            return NextResponse.json(
                { error: "Eksik veya hatalı veri gönderildi." },
                { status: 400 }
            );
        }
        const prompt = `
Aşağıdaki formatta yazılı olacak şekilde, "${requestedArea}" alanında "${level}" seviyesinde 5 adet çoktan seçmeli mülakat sorusu üret.Her soru için ipucu butonu olacak ve sorular 4 şıklı olsun ve Her soru şu yapıda olmalı (ve tüm çıktıyı JSON standardına %100 uygun olarak ver):
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
Sadece JSON çıktısı ver, başka açıklama yazma.
`;
        const result = ai.models.generateContent({ model: "gemini-1.5-flash", contents: prompt }); // Get the model instance

        // Access the text content from the response
        const promptAnswer = (await result).text as string;
        const cleaned = promptAnswer.trim().replace(/```json|```/g, '')
        const parsed = JSON.parse(cleaned)
        console.log(parsed)
        // It's good practice to parse the JSON and return it

        return NextResponse.json({ questions: parsed }, { status: 200 }); // Return the parsed JSON

    } catch (error) {
        console.error("API hatası:", error);
        // More specific error handling for JSON parsing vs. API issues might be good
        return NextResponse.json(
            { error: "Sunucu tarafında bir hata oluştu." },
            { status: 500 }
        );
    }
}