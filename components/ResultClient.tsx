"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface Question {
    id: string
    text: string
    hint: string
}

export default function ResultClient() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [meta, setMeta] = useState<any>(null)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [id, setID] = useState<number>(1)
    const [showHint, setShowHint] = useState<Record<number, boolean>>({})
    const router = useRouter();
    useEffect(() => {
        const q = sessionStorage.getItem("questions")
        const m = sessionStorage.getItem("meta")

        if (q) setQuestions(JSON.parse(q))
        if (m) setMeta(JSON.parse(m))
    }, [])

    function handleChange(id: string, value: string) {
        setAnswers(prev => ({ ...prev, [String(id)]: value }))
    }

    function handleSubmit() {
        sessionStorage.setItem("answers", JSON.stringify(answers))
        console.log("Kullanıcı cevapları:", answers)
        // Burada cevapları değerlendirme veya API'ye gönderme yapılabilir
        router.push('/interview/result')
    }

    function handleNextQuestion() {
        if (id < questions.length) {
            setID(prev => prev + 1)
        } else {
            handleSubmit()
        }
    }

    if (!questions.length) {
        return <p>Veri bulunamadı.</p>
    }

    const currentQuestion = questions[id - 1];

    return (
        <div className="flex flex-col items-center justify-center w-full h-dvh lg:h-[50vh]">
            <h2>{meta?.profession} - {meta?.level}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleNextQuestion() }} >
                {currentQuestion && (
                    <div className="mb-6">
                        <p className="font-semibold">{currentQuestion.text}</p>
                        <input
                            type="text"
                            placeholder="Cevabınızı yazın..."
                            value={answers[String(currentQuestion.id)] || ""}
                            onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                            className="border p-2 w-full mt-2"
                        />
                        {showHint[Number(currentQuestion.id)] ? <p>{currentQuestion.hint}</p> : <Button onClick={() => setShowHint(prev => ({ ...prev, [currentQuestion.id]: !prev[Number(currentQuestion.id)] }))}>Göster</Button>}
                    </div>
                )}
                <div className="flex justify-between w-full">
                    {id > 1 && <Button type="button" onClick={() => {
                        setID(prev => prev - 1)
                    }}>Geri</Button>}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {id === questions.length ? <div>Sonucu Gör</div> : <div>Sıradaki Soru</div>}
                    </button>
                </div>
            </form>
        </div>
    )
}
