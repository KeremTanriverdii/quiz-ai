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
    const [questions, setQuestions] = useState<Questionsa[]>([])
    // answers state save the cookie 
    const [answers, setAnswers] = useState<Record<string, string>>({})
    // show the one question max 10
    const [id, setID] = useState<number>(1)
    // show the hint
    const [showHint, setShowHint] = useState<Record<string, boolean>>({})
    // if user finished the quiz redirect to /form/result page
    const router = useRouter();
    // const userInfo = user || null;



    // Shuffle to questions 
    function shuffleQuestions<T extends { _id: string }>(questions: T[]): T[] {
        const copy = [...questions];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }


    // below useEffect will be remove for the new quention logic
    useEffect(() => {
        const shuffled = shuffleQuestions(question)
        setQuestions(shuffled)

    }, [question])

    useEffect(() => {
        const el = document.fullscreenElement
    })

    function handleChange(id: string, value: string) {
        setAnswers(prev => ({ ...prev, [id]: value }))
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

    if (!questions.length) return <p>Veri bulunamadı</p>

    const currentQuestion = questions[id - 1];


    console.log(currentQuestion)
    return (
        // <div className="md:col-span-1 mx-10 h-full">
        <form onSubmit={(e) => { e.preventDefault(); handleNextQuestion() }} className="h-full">
            {currentQuestion && (
                <div className="h-full">
                    <Card className="mb-6 h-full ">
                        <CardContent className="flex flex-col justify-between items-stretch h-full">
                            <div className="flex flex-col gap-2 justify-between">
                                <p>Question: {id}/10</p>
                                <QuestionProgress id={id} />
                            </div>
                            <div className="flex flex-col md:flex-row gap-5 lg:mt-5 lg:mb-5">
                                <Card className="w-full lg:p-5 ">
                                    {currentQuestion.tech}
                                    <p className="font-semibold mt-5 mb-5 lg:w-3/4">{currentQuestion.questionText}</p>
                                </Card>
                                <Image src="/think.png" alt="thinking" width={200} height={200} />
                            </div>
                            <Label htmlFor="answers"></Label>

                            {/* If question is open show the monaco editor vs-code */}
                            {currentQuestion.type === 'open' && (
                                <div className="flex flex-col items-center h-85 w-full">
                                    <Editor
                                        theme="vs-dark"
                                        defaultLanguage={currentQuestion.tech || 'javascript'}
                                        defaultValue={currentQuestion.templates?.[0]?.templateCode || ''}
                                        options={{
                                            minimap: { enabled: false },
                                            readOnly: false,
                                            allowOverflow: false,
                                            wordWrap: 'on',
                                            wordWrapColumn: 100,
                                            wrappingIndent: 'same',
                                            scrollBeyondLastLine: false,
                                            overviewRulerLanes: 0,
                                            renderWhitespace: "none",
                                        }}
                                        value={answers[Number(currentQuestion._id)] || ""}
                                        onChange={(value?: string) =>
                                            currentQuestion?._id && handleChange(currentQuestion._id, value || "")}
                                    />
                                </div>
                            )}

                            {/* Mvc sections */}
                            {currentQuestion.type === 'mvc' && (
                                <div className="grid grid-cols-2 gap-2 w-full mb-10 mt-10">
                                    {currentQuestion.options?.map((option, sIdx) => (
                                        <Button key={sIdx}
                                            className="w-full h-12"
                                            onClick={() => handleChange(currentQuestion._id, option.optionText)}
                                        >
                                            {option.optionText}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {/* Hint Button */}
                            <div className="mb-10 mt-2 self-baseline ">
                                {showHint[currentQuestion._id] ?
                                    <p className="text-white">{currentQuestion.hintText}</p> :
                                    <Button
                                        onClick={() => setShowHint(prev => ({
                                            ...prev, [currentQuestion._id]: !prev[currentQuestion._id]
                                        }))}>
                                        {datax.hint}
                                        <Cpu className="ml-2" />
                                    </Button>
                                }
                            </div>
                            {/* Next,Back Button */}
                            <div className="flex justify-center gap-2">
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
                                    {id === question.length ?
                                        <div>{datax.showResut} </div> :
                                        <span className="flex mx-auto">
                                            {datax.next} <MoveRight className="ml-2 lg:mt-0.5" />
                                        </span>

                                    }
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </form>

        // </div>
    )
}
