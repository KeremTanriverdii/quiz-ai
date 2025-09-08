"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Session } from "next-auth"
import { Card, CardContent } from "./ui/card"
import QuestionProgress from "./blocks/Progress/QuestionProgress"
import { Cpu, MoveLeft, MoveRight } from "lucide-react"
import Image from "next/image"
interface Question {
    id: string
    text: string
    hint: string
}

export default function ResultClient({ data, user }: { data?: any, user: Session | null }) {
    const datax = data || null
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [id, setID] = useState<number>(1)
    const [showHint, setShowHint] = useState<Record<number, boolean>>({})
    const router = useRouter();
    const userInfo = user || null
    useEffect(() => {
        const q = sessionStorage.getItem("questions")

        if (q) setQuestions(JSON.parse(q))
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
        <div className="md:col-span-1 lg:col-span-3">
            <form onSubmit={(e) => { e.preventDefault(); handleNextQuestion() }} className="lg:mt-20">
                {currentQuestion && (
                    <Card className="mb-6 h-fit">
                        <CardContent>
                            <div className="flex flex-col gap-2 justify-between">
                                <p>Question: {currentQuestion.id}/10</p>
                                <QuestionProgress id={currentQuestion.id} />
                            </div>
                            <div className="flex flex-col md:flex-row gap-5 lg:mt-5">
                                <p className="font-semibold mt-5 mb-5 lg:w-3/4">{currentQuestion.text}</p>
                                <Image src="/think.png" alt="thinking" width={200} height={160} className="ms-auto rounded-full hidden md:block" />
                            </div>
                            <div className="flex flex-col items-center">
                                <Label htmlFor="answers" className="self-baseline">{datax.yourAnswer}</Label>
                                <Textarea
                                    id="answers"
                                    placeholder="Type your answers here."
                                    value={answers[String(currentQuestion.id)] || ""}
                                    onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                                    className="border p-2 mt-2 resize-none "
                                    style={{ height: '200px' }}
                                />
                            </div>
                            <div className="mx-auto mb-5 mt-5">
                                {showHint[Number(currentQuestion.id)] ?
                                    <p>{currentQuestion.hint}</p> :
                                    <Button
                                        onClick={() => setShowHint(prev => ({
                                            ...prev, [currentQuestion.id]: !prev[Number(currentQuestion.id)]
                                        }))}>
                                        {datax.hint} <Cpu className="ml-2" />
                                    </Button>
                                }
                            </div>
                            <div className="flex gap-2 justify-between md:justify-end lg:mt-5 ">
                                {id > 1 &&
                                    <Button type="button" onClick={() => {
                                        setID(prev => prev - 1)
                                    }}>
                                        <MoveLeft className="me-2" />
                                        {datax.back}
                                    </Button>}

                                <Button
                                    type="submit"
                                    className="flex items-center justify-center"
                                >
                                    {id === questions.length ?
                                        <div>{datax.showResut} </div> :
                                        <span className="flex mx-auto">
                                            {datax.next} <MoveRight className="ml-2 lg:mt-0.5" />
                                        </span>

                                    }
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

            </form>

        </div>
    )
}
