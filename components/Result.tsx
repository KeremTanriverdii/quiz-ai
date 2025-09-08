"use client"

import { useEffect, useState, useCallback } from "react"
import { ChartConfig } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import ChartsTotal from "@/components/blocks/reusable/charts/ChartsTotal"
import ChartsBarScore from "@/components/blocks/reusable/charts/ChartsBarScore"
import { FeedBack, Question, Tech, TotalX } from "@/components/data/type"
import GetFeedback from "@/components/blocks/reusable/charts/GetFeedback"
import { evaluateAnswers } from "@/app/[locale]/interview/action"

export default function InterviewResult({ data }: { data?: any }) {
    const { dataI18n } = data;
    console.log(dataI18n)
    // Answers state get the sessionStorege answers  
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [questions, setQuestions] = useState<Question[]>([])
    const [feedbacks, setFeedbacks] = useState<Record<number, FeedBack>>({})
    const [loading, setLoading] = useState(false);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalGet, setTotalGet] = useState<TotalX>({ level: "", profession: "", stack: [] });
    const [profession, setProfession] = useState<Tech>({ professionTech: [{ tech: "", fields: [{ field: "", score: 0 }] }] })

    useEffect(() => {
        // This useEffect going to 
        const storedAnswers = sessionStorage.getItem("answers")
        const level = sessionStorage.getItem("level")
        const profession = sessionStorage.getItem("profession")
        const stack = sessionStorage.getItem("stack")
        const storedQuestions = sessionStorage.getItem("questions")
        if (storedAnswers) setAnswers(JSON.parse(storedAnswers))
        if (storedQuestions) setQuestions(JSON.parse(storedQuestions))
        if (level) setTotalGet({ ...totalGet, level })
        if (profession) setTotalGet({ ...totalGet, profession })
        if (stack) setTotalGet({ ...totalGet, stack: JSON.parse(stack) })
        else {
            setLoading(false)
        }
    }, [])

    const evaluateAll = useCallback(async () => {
        if (questions.length === 0 || Object.keys(answers).length === 0) {
            if (questions.length > 0) {
                // we have questions but no answers, still need to stop loading
                setLoading(false)
            }
            return
        }

        setLoading(true)
        const newFeedbacks: Record<number, FeedBack> = {}

        for (const q of questions) {
            const key = q.id.toString();
            const ans = answers[key] || ""

            if (!ans) {
                newFeedbacks[parseInt(key)] = { ratingText: "Bu soruya cevap verilmemiş.", professionTech: [{ tech: "", fields: [{ field: "", score: 0 }] }] };
                continue
            }
            try {
                const fb = await evaluateAnswers(q.text, ans, totalGet)
                if (typeof fb === "string") {
                    newFeedbacks[parseInt(key)] = { message: 'Değerlendirme sırasında hata oluştu', ratingText: fb, professionTech: [{ tech: '', fields: [{ field: "", score: 0 }] }] };

                } else if (typeof fb === 'object') {
                    newFeedbacks[parseInt(key)] = fb;
                    setProfession(prev => ({ ...prev, professionTech: fb.professionTech }))
                }
                else {
                    newFeedbacks[parseInt(key)] = { ratingText: "Değerlendirme sırasında hata oluştu.", professionTech: [{ tech: '', fields: [{ field: "", score: 0 }] }] }
                }
            } catch (e) {
                console.error("❌ evaluateAnswers hata:", e)
                newFeedbacks[parseInt(key)] = { ratingText: "Değerlendirme sırasında hata oluştu.", professionTech: [{ tech: '', fields: [{ field: "", score: 0 }] }] }
            }
        }
        setFeedbacks(newFeedbacks)
        setLoading(false)
    }, [questions, answers])

    useEffect(() => {
        evaluateAll()
    }, [evaluateAll])

    useEffect(() => {
        if (Object.keys(feedbacks).length === 0) return;
        const total = Object.values(feedbacks).reduce((sum, fb) => {
            return sum + (fb.score || 0);
        }, 0);
        setTotalScore(total)
    })

    const getScoreMessage = (score: number): string => {
        if (score >= 45) return data.ScoreMessage4;
        if (score >= 35) return data.ScoreMessage3;
        if (score >= 25) return data.ScoreMessage2;
        if (score >= 15) return data.ScoreMessage1;
        return data.ScoreMessage0;
    }

    const chartData = [
        { Bölüm: profession, puan: totalScore },
    ]
    const chartConfig = {
        puan: {
            label: "scor",
            color: "gray-500",
        },
    } satisfies ChartConfig

    const chartBarData = profession?.professionTech?.flatMap((tech) =>
        tech.fields.map((field) => ({
            name: `${tech.tech} - ${field.field}`,
            value: field.score,
        }))
    ) || []
    const chartBarConfig = profession?.professionTech?.reduce((acc, item) => {
        acc[item.tech] = {
            label: `item.tech - scor`,
            color: `gray-500`
        }
        return acc
    }, {} as Record<string, { label: string; color: string }>) || {}

    const techScor = profession?.professionTech?.map((tech) => ({
        scors: tech.fields.reduce((sum, field) => sum + field.score, 0),
        name: tech.tech
    }))

    return (
        <main className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:p-15 mx-5">
            {loading ? <>
                <div className="row flex col-span-2 flex-col h-full">
                    <div className="row flex flex-col gap-5 h-full">
                        <Skeleton className="rounded-xl h-[500px] w-full" />
                        <Skeleton className="rounded-xl h-[500px] w-full" />
                    </div>
                    <Skeleton className="h-full w-full rounded-xl" />
                </div>

                <div className="col-span-2">
                    <Skeleton className="h-full w-full rounded-xl" />
                </div>
            </>
                : <>
                    <div className="row col-span-2 flex flex-col gap-5 h-full">
                        <ChartsTotal totalScore={totalScore} getScoreMessage={getScoreMessage} chartData={chartData} chartConfig={chartConfig} data={dataI18n} />
                        <ChartsBarScore chartBarData={chartBarData} chartBarConfig={chartBarConfig} getScoreMessage={getScoreMessage} techScors={techScor || []} data={dataI18n} />
                    </div>
                    <div className="col-span-2">
                        <GetFeedback question={questions} answer={answers} feedback={feedbacks} data={dataI18n} />
                    </div>
                </>}

        </main>
    )
}