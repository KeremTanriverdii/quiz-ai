"use client"
// This page will be arrangement correct state.
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Session } from "next-auth"
import { Card, CardContent } from "./ui/card"
import QuestionProgress from "./blocks/Progress/QuestionProgress"
import { Cpu, MoveLeft, MoveRight } from "lucide-react"
import Image from "next/image"
import Editor from '@monaco-editor/react'
import { Questionsa } from "@/app/[locale]/interview/questions/page"
interface Question {
    id: string;
    text: string;
    hint: string;
    tech: string;
    type: string;
    options: string[];
    template: string;
}

export default function ResultClient(
    { data, user, question }:
        {
            data?: any,
            user: Session | null,
            question: Questionsa[]
        }
) {
    // datax for chose user's language 
    const datax = data || null
    const [questions, setQuestions] = useState<Question[]>([])
    // answers state save the cookie 
    const [answers, setAnswers] = useState<string[]>([])
    // show the one question max 10
    const [id, setID] = useState<number>(1)
    // show the hint
    const [showHint, setShowHint] = useState<Record<number, boolean>>({})
    // if user finished the quiz redirect to /form/result page
    const router = useRouter();
    // const userInfo = user || null

    // below useEffect will be remove for the new quention logic
    useEffect(() => {
        const q = sessionStorage.getItem("questions")

        if (q) setQuestions(JSON.parse(q))
    }, [])

    function handleChange(id: string, value: string) {
        setAnswers(prev => ({ ...prev, [String(id)]: value }))
    }

    function handleSubmit() {
        sessionStorage.setItem("answers", JSON.stringify(answers))

        router.push('/interview/result')
    }

    // Next question button function
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

    console.log(questions)
    return (
        <div className="md:col-span-1 ">
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
                            <div className="flex flex-col items-center h-85 w-full">
                                <Label htmlFor="answers" className="self-baseline mb-5">{datax.yourAnswer}: </Label>
                                {currentQuestion.type === 'open' && (
                                    <Editor
                                        // id="answers"
                                        // placeholder="Type your answers here."
                                        defaultLanguage={currentQuestion.tech || 'javascript'}
                                        options={{
                                            minimap: { enabled: false },
                                            readOnly: false,
                                        }}
                                        defaultValue={currentQuestion.template}
                                        theme="vs-dark"
                                        value={answers[Number(currentQuestion.id)] || ""}
                                        onChange={(value?: string) => handleChange(currentQuestion.id, value || "")}
                                    // onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                                    // onKeyDown={(e) => {
                                    //     if (e.key === 'Enter' && !e.shiftKey) {
                                    //         e.preventDefault();

                                    //         handleSendMessage();
                                    //     }
                                    // }}
                                    // className="flex-initial resize-none p-2 rounded-xl border border-[#ccc] min-[40px]:"
                                    // style={{ height: '200px' }}
                                    />
                                )}

                                {currentQuestion.type === 'mcq' && (
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        {currentQuestion.options.map((option, sIdx) => (
                                            <Button key={sIdx} className="w-full h-12" onClick={() => handleChange(currentQuestion.id, option)}>{option}</Button>
                                        ))}
                                    </div>
                                )}
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
