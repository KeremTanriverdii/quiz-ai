"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Question } from "@/components/data/type"
import { Button } from "@/components/ui/button"
import { AiResp } from "@/app/[locale]/interview/result/action"
import ChartsTotal from "./ChartsTotal"
import ChartsBarScore from "./ChartsBarScore"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


export default function GetFeedback({ question, answer, data }: {
    question: Question[],
    answer: Record<number, AiResp>,
    data?: any
}) {
    // const datax = data || null
    const [selectionQuestion, setSelectionQuestion] = useState<number | null>(null);
    const handleRenderforQId = (id: number) => {
        setSelectionQuestion(id);
    }
    const score = selectionQuestion !== null ? answer[selectionQuestion]?.overall_score ?? 0 : 0;
    const bartCcore: number | number[][] = selectionQuestion !== null && answer[selectionQuestion]?.professionTech ? answer[selectionQuestion].professionTech.map(x => x.fields.map(y => y.score)) : 0;
    const entiresScore: { name: string; score: number } | any = selectionQuestion !== null && answer[selectionQuestion]?.score
        ? Object.entries(answer[selectionQuestion].score).map(([name, score]) => ({
            name,
            score,
        }))
        : [];
    const getScoreMessageForQuestion = (score: number) => {
        if (score <= 8) return "It looks like you're just getting started. Keep practicing!";
        if (score <= 15) return "You're on the right track, but there's more to learn.";
        if (score <= 20) return "Good effort! There are some areas for improvement.";
        if (score <= 32) return "Great job! You have a solid understanding.";
        if (score <= 45) return "Excellent! You have a strong grasp of the concepts."
    }

    console.log(entiresScore)
    const getColorbyScore = (score: number): string | undefined => {
        if (score <= 4) return 'red';
        if (score <= 7) return 'yellow';
        return 'green';
    }
    const chartData = [
        { name: 'score', score: score }
    ] as any;
    const chartConfig = {
        score: {
            label: 'Score'
        }


    } satisfies ChartConfig;

    const chartBarData =
        selectionQuestion !== null
            ? answer[selectionQuestion]?.professionTech?.flatMap(tech =>
                tech.fields.map(field => ({
                    name: `${tech.tech} - ${field.field}`,
                    score: field.score
                }))
            ) ?? []
            : []
    const chartBarConfig = {
        score: {
            label: "Score"
        }
    }

    const currentAnswers = question.filter(q => q.id === selectionQuestion)
    const chartDataSkill = entiresScore

    const chartConfigSlill = {
        score: {
            label: 'Score',
            color: 'var(--color-desktop)'
        }
    }
    // currentAnswers !== null ?  Object.values(answer(Number([selectionQuestion]))).flatMap((item) =>
    //     Object.entries(item.score || 'empty chartDataSkill').map(([name, score]) => ({
    //         name,
    //         score,
    //     }))
    // );

    const chartDataConfig = {
        score: {
            label: 'Score',
        }
    } satisfies ChartConfig
    // const chartDataSkill = [
    //     {
    //         name: selectionQuestion !== null ? answer[selectionQuestion]?.score?.correctness: 'x',
    //         score: selectionQuestion !== null ? answer[selectionQuestion]?.score?.correctness: 'x'
    //     },
    //     {
    //         name : selectionQuestion !== null ? answer[selectionQuestion]?.score?.code_quality: 'y',
    //         score : selectionQuestion !== null ? answer[selectionQuestion]?.score?.code_quality: 'y'
    //     },
    //     {
    //         name: selectionQuestion !== null ? answer[selectionQuestion]?.score?.completeness: 'z',
    //         score: selectionQuestion !== null ? answer[selectionQuestion]?.score?.completeness: 'z',
    //     },

    // ] as {}
    return (
        <div>
            <Card className="h-full">
                {/* <CardTitle>{datax.questions}</CardTitle> */}
                {selectionQuestion === null && (
                    <CardContent className="grid grid-cols-3 gap-5 text-center">
                        {question.map(q => (
                            <Card key={q.id} className="lg:p-6 cursor-pointer" onClick={() => handleRenderforQId(q.id as number)}>
                                <CardHeader className="font-bold">
                                    {q.id}
                                </CardHeader>
                            </Card>

                        ))}
                    </CardContent>
                )}


                {selectionQuestion !== null && (
                    <>
                        {question.filter(q => q.id === selectionQuestion).map(q => (
                            <div key={q.id} className="flex flex-col mb-6 h-full">
                                <CardTitle>
                                    <strong>{q.text}</strong>
                                    <Button onClick={() => setSelectionQuestion(null)}>X</Button>
                                </CardTitle>
                                <CardContent>
                                    {/* <span className="font-bold">Cevabınız:</span> {answer[Number(q.id)] || "Cevaplanmamış"} <br /> */}
                                    <p className="font-bold">
                                        {answer[Number(q.id)]?.ratingText || "Değerlendirme bekleniyor..."}
                                    </p>
                                </CardContent>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row gap-5 items-stretch lg:mt-10">
                                        <ChartsTotal
                                            totalScore={Number(answer[selectionQuestion]?.overall_score)}
                                            getScoreMessage={getScoreMessageForQuestion}
                                            chartData={chartData}
                                            chartConfig={chartConfig}
                                            data={data}
                                        />
                                        <ChartsBarScore
                                            chartBarData={chartBarData}
                                            chartBarConfig={chartBarConfig}
                                            score={bartCcore}
                                            techScors={answer[selectionQuestion]?.professionTech || []}
                                        />
                                    </div>
                                    <Card className="mt-5">
                                        <CardHeader>
                                            <CardTitle>Your Code Skills</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer config={chartConfigSlill}>
                                                <BarChart accessibilityLayer data={chartDataSkill}>
                                                    <CartesianGrid vertical={false} />
                                                    <XAxis
                                                        dataKey="name"
                                                        tickLine={false}
                                                        tickMargin={10}
                                                        axisLine={false}
                                                    // tickFormatter={(value) => value.slice(0, 3)}
                                                    />
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={<ChartTooltipContent hideLabel />}
                                                    />
                                                    <Bar dataKey="score" fill={getColorbyScore(entiresScore.map((x: { score: any }) => x.score))} radius={8} />
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </CardContent>


                            </div>
                        ))}
                    </>
                )}
            </Card>
            {/* {currentAnswers.map(q => (
                <Card key={q.id} className="flex flex-col mb-6">
                    <CardTitle>
                        <strong>{q.text}</strong>
                    </CardTitle>
                    <CardContent>
                        Cevabınız: {answer[Number(q.id)]?.feedback || "Cevaplanmamış"}
                        <p>
                            Geri Bildirim:{" "}
                            {answer[Number(q.id)]?.ratingText || "Değerlendirme bekleniyor..."}
                        </p>
                    </CardContent>
                </Card>
            ))} */}
        </div>
    )
}
