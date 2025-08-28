"use client"

import { useEffect, useState, useCallback } from "react"
import { evaluateAnswers } from "../action"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import GetFeedback from "@/app/components/blocks/GetFeedback"

interface Question {
    id: number
    text: string
    hint: string

}
export interface FeedBack {
    score?: number;
    ratingText: string;
    message?: string;
    professionTech: {
        tech: string;
        fields: { field: string; score: number }[];
    }[];
}
export interface TotalX {
    level: string
    profession: string
    stack: string[]
}
interface Tech {
    professionTech?: { tech: string, fields: { field: string, score: number }[] }[]
}

export default function InterviewResult() {
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [questions, setQuestions] = useState<Question[]>([])
    const [feedbacks, setFeedbacks] = useState<Record<string, FeedBack>>({})
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<number>(1);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalGet, setTotalGet] = useState<TotalX>({ level: "", profession: "", stack: [] });
    const [profession, setProfession] = useState<Tech>({ professionTech: [{ tech: "", fields: [{ field: "", score: 0 }] }] })

    useEffect(() => {
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
                console.log(fb)
                if (typeof fb === "string") {
                    newFeedbacks[parseInt(key)] = { message: 'Değerlendirme sırasında hata oluştu', ratingText: fb, professionTech: [{ tech: '', fields: [{ field: "", score: 0 }] }] };

                } else if (typeof fb === 'object') {
                    newFeedbacks[parseInt(key)] = fb
                    setTotalScore(prev => prev + (fb.score || 0));
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

    // if (loading) return <p>Sonuçlar yükleniyor ve değerlendiriliyor...</p>
    // if (!questions.length) return <p>Veri bulunamadı.</p>

    // const currentAnswers = questions.filter(q => answers[String(q.id)]);

    const chartData = [
        { Bölüm: profession, puan: totalScore, fill: "var(--color-safari)" },
    ]
    const chartConfig = {
        visitors: {
            label: "Genel Puan",
        },
        safari: {
            label: "Safari",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const getScoreMessage = (score: number) => {
        if (score >= 45) return "Excellent! You have a strong grasp of the concepts.";
        if (score >= 35) return "Great job! You have a solid understanding.";
        if (score >= 25) return "Good effort! There are some areas for improvement.";
        if (score >= 15) return "You're on the right track, but there's more to learn.";
        return "It looks like you're just getting started. Keep practicing!";
    }



    const selectedFeedback = Object.values(feedbacks)[0] // örnek, ilk feedback
    const chartBarData = selectedFeedback?.professionTech.flatMap((tech) =>
        tech.fields.map((field) => ({
            name: field.field,
            value: field.score,
            fill: "var(--color-safari)"
        }))
    ) || []
    const chartBarConfig = selectedFeedback?.professionTech.reduce((acc, item) => {
        acc[item.tech] = {
            label: item.tech,
            color: `var(--color-${item.tech.toLowerCase()})`
        }
        return acc
    }, {} as Record<string, { label: string; color: string }>) || {}


    // console.log(questions.filter((c) => c.id === isTrue]).map(q => q.id))
    return (
        <main className="grid grid-cols-2 gap-4 lg:p-10 ">
            <div className="row flex flex-col gap-5">
                {loading ? <>
                    <Card className="flex flex-col">
                        <Skeleton className="rounded-xl" />
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Total Score</CardTitle>
                            <CardDescription>{getScoreMessage(totalScore)}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <RadialBarChart
                                    data={chartData}
                                    startAngle={-90}
                                    endAngle={-90 + (totalScore / 50) * 360}
                                    innerRadius={80}
                                    outerRadius={140}
                                >
                                    <PolarGrid
                                        gridType="circle"
                                        radialLines={false}
                                        stroke="none"
                                        className="first:fill-muted last:fill-background"
                                        polarRadius={[86, 74]}
                                    />
                                    <RadialBar dataKey="visitors" background />
                                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-4xl font-bold"
                                                            >
                                                                {totalScore}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                / 50
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                </RadialBarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                <TrendingUp className="h-4 w-4" />
                                {totalScore > 25 ? "You are doing great!" : "Keep working on it!"}
                            </div>
                            <div className="leading-none text-muted-foreground">
                                This score is based on your answers.
                            </div>
                        </CardFooter>
                    </Card>
                    <Card>
                        <Skeleton className="rounded-xl" />
                        <CardHeader>
                            <CardTitle>Bar Chart - Label</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartBarConfig}>
                                <BarChart
                                    accessibilityLayer
                                    data={chartBarData}
                                    margin={{
                                        top: 20,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    {Object.keys(chartBarConfig).map((key) => (
                                        <Bar
                                            key={key}
                                            dataKey={key} // This should be the field name, e.g., 'score' or 'field'
                                            fill={chartBarConfig[key as keyof typeof chartBarConfig]?.color as string}
                                            radius={8}
                                        >
                                            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                                        </Bar>
                                    ))}
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </>
                    : <>
                        <Card className="flex flex-col">
                            <CardHeader className="items-center pb-0">
                                <CardTitle>Total Score</CardTitle>
                                <CardDescription>{getScoreMessage(totalScore)}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <RadialBarChart
                                        data={chartData}
                                        startAngle={-90}
                                        endAngle={-90 + (totalScore / 50) * 360}
                                        innerRadius={80}
                                        outerRadius={140}
                                    >
                                        <PolarGrid
                                            gridType="circle"
                                            radialLines={false}
                                            stroke="none"
                                            className="first:fill-muted last:fill-background"
                                            polarRadius={[86, 74]}
                                        />
                                        <RadialBar dataKey="visitors" background />
                                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    className="fill-foreground text-4xl font-bold"
                                                                >
                                                                    {totalScore}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 24}
                                                                    className="fill-muted-foreground"
                                                                >
                                                                    / 50
                                                                </tspan>
                                                            </text>
                                                        )
                                                    }
                                                }}
                                            />
                                        </PolarRadiusAxis>
                                    </RadialBarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    <TrendingUp className="h-4 w-4" />
                                    {totalScore > 25 ? "You are doing great!" : "Keep working on it!"}
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    This score is based on your answers.
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <Skeleton className="rounded-xl" />
                            <CardHeader>
                                <CardTitle>Bar Chart - Label</CardTitle>
                                <CardDescription>January - June 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartBarConfig}>
                                    <BarChart
                                        accessibilityLayer
                                        data={chartBarData}
                                        margin={{
                                            top: 20,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        {Object.keys(chartBarConfig).map((key) => (
                                            <Bar
                                                key={key}
                                                dataKey={key} // This should be the field name, e.g., 'score' or 'field'
                                                fill={chartBarConfig[key as keyof typeof chartBarConfig]?.color as string}
                                                radius={8}
                                            >
                                                <Bar dataKey="value">
                                                    <LabelList dataKey="value" formatter={(val: number) => `${val}/10`} />
                                                    {chartBarData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill || "var(--color-safari)"} />
                                                    ))}
                                                </Bar>
                                            </Bar>
                                        ))}
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <div className="flex gap-2 leading-none font-medium">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="text-muted-foreground leading-none">
                                    Showing total visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                    </>}


            </div>

            <GetFeedback question={questions} answer={answers} feedback={feedbacks} />
        </main>
    )
}