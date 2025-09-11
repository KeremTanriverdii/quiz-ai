'use server'

import { TotalX } from '@/components/data/type'
import { GoogleGenerativeAI } from '@google/generative-ai'


export async function generateQuestion(formData: FormData) {
  const profession = formData.get('profession') as string
  const level = formData.get('level') as string
  const stackRaw = formData.get('stack') as string

  if (!profession || !level || !stackRaw) {
    throw new Error('Eksik veri gönderildi.')
  }

  const stackObj = JSON.parse(stackRaw)
  const stackArray = Object.values(stackObj).flat()
  const prompt =
    `You are a senior technical interviewer. Your task is to generate ten open-ended technical questions for a user based on their professional context.
  **User Profile:**
- **Profession:** ${profession}
- **Level:** ${level}
- **Tech Stack:** [${stackArray.join(", ")}]

**Instructions:**
1. **Generate ten open-ended technical questions** that are directly relevant to the user's profession and tech stack.
2. The questions should increase in difficulty.
3. You can create combined questions that involve multiple technologies from the provided tech stack (e.g., "How would you integrate React with Tailwind CSS?").
4. Assign a random difficulty score from 1 to 5 for each question.
5. **Crucially, ensure that at least one question has a difficulty of 1 and at least one question has a difficulty of 5.**
6. Do not provide multiple-choice questions; only generate open-ended questions.
7. The output must be a valid JSON array and contain only the JSON. Do not include any other text, explanations, or code blocks.

**Output Format:**
- The response must be a JSON array of ten objects.
- Each object in the array should have the following structure:
json
[
  {
    "id": (A unique number from 1 to 5),
    "text": "(The question text)",
    "hint": "(A helpful hint for the user)",
    "difficulty": (A number from 1 to 5, ensuring at least one '1' and one '5')
  }
]`

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const cleaned = text.trim().replace(/```json|```/g, '') || '[]'
  const questions = JSON.parse(cleaned)
  return { questions, profession, level, stack: stackArray }
}


export async function evaluateAnswers(questions: string, userAnswer: string, TotalProof: TotalX) {
  const prompt =
    `You are an expert software developer and technical evaluator. Your task is to analyze a user's answer to a given question and provide a comprehensive evaluation.
**Evaluation Context:**
- **Question:** ${questions}
- **User's Answer:** ${userAnswer}
- **User Profile:**
  - **Level:** ${TotalProof.level} (e.g., Junior, Mid, Senior)
  - **Profession:** ${TotalProof.stack} (e.g., Front-end Developer, Data Scientist)
  - **Tech Stack:** [${TotalProof.stack.join(", ")}]

**Instructions:**
1.  **Analyze the answer** based on the user's provided context (level, profession, tech stack).
2.  **Provide a concise rating text.**
    - If correct: Offer a 1-2 sentence congratulatory message.
    - If partially correct or incomplete: Briefly state the missing points and provide a piece of advice.
    - If incorrect: State the correct answer and give a brief explanation.
3.  **Provide a "score"** from 1 to 10 based on the evaluation, as a number, be carefull question difficulity. Total score is max 100 points.
4.  **Identify specific sub-fields** within the user's tech stack that are relevant to the question.
    - For each sub-field, provide a name (e.g., "React Hooks", "Kubernetes", "Python Data Structures").
    - For each sub-field, provide a score from 1 to 10 based on the user's demonstrated knowledge in their answer.
    - You can provide 1 to 3 sub-fields.

**Output Format:**
- Your response must be a **valid JSON object** and contain **only** the JSON.
- Do **NOT** include any other text, explanations, or code blocks outside the JSON.
- The JSON structure should be as follows:
json
{
  "ratingText": "(Evaluation text based on instructions)",
  "score": (A number from 1-10),
  "professionTech": [
    {
      "tech": "(Relevant technology from the tech stack, e.g., 'React')",
      "fields": [
        {
          "field": "(A relevant sub-field, e.g., 'React State Management')",
          "score": (A number from 1-10)
        }
      ]
    }
  ]
} And answers will be Turkish`
    ;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    const cleaned = responseText.trim().replace(/```json|```/g, '') || '{}'
    const parsedResponse = JSON.parse(cleaned);

    const score: number = parsedResponse.score;
    const ratingText: string = parsedResponse.ratingText;
    const professionTech: { tech: string, fields: { field: string, score: number }[] }[] = parsedResponse.professionTech
    return { score: score, ratingText: ratingText, professionTech: professionTech }
  } catch (err) {
    console.error('Is error for during the response', err)
  }
}