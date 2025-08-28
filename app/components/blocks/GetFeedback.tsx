"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "../ui/button"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Label, LabelList, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import { FeedBack } from "@/app/interview/result/page"
import { colorMap } from "@/app/data/type"


export default function GetFeedback({ question, answer, feedback }: {
    question: { id: number, text: string, hint: string }[],
    answer: Record<string, string>,
    feedback: Record<number, FeedBack>
}) {
    const [selectionQuestion, setSelectionQuestion] = useState<number | null>(null);

    const handleRenderforQId = (id: number) => {
        setSelectionQuestion(id);
    }
    const getScoreMessageForQuestion = (score: number) => {
        if (score <= 2) return "It looks like you're just getting started. Keep practicing!";
        if (score <= 4) return "You're on the right track, but there's more to learn.";
        if (score <= 6) return "Good effort! There are some areas for improvement.";
        if (score <= 8) return "Great job! You have a solid understanding.";
        if (score <= 10) return "Excellent! You have a strong grasp of the concepts."
    }

    const chartData = [
        { name: 'Score', value: feedback[selectionQuestion || 0]?.score || 0, fill: 'var(--color-safari)' }
    ]

    const chartBarData = feedback[selectionQuestion || 0]?.professionTech.flatMap((tech) =>
        tech.fields.map((field) => ({
            name: field.field,
            scor: field.score,
            tech: tech.tech, // burada renk eşlemek için lazım
        }))
    );

    const chartBarConfig = feedback[selectionQuestion || 0]?.professionTech?.reduce((acc, item) => {
        acc[item.tech.toLocaleLowerCase()] = {
            label: item.tech,
            color: colorMap[item.tech.toLocaleLowerCase()] || 'var(--color-safari)'
        }
        return acc
    }, {} as Record<string, { label: string; color: string }>) || {}

    const chartConfig = {
        sorupuan: {
            label: 'Sorunun puanı',
            color: 'var(--chart-2)',
        },
        javascript: {
            label: 'JavaScripta',
            color: 'var(--chart-1)',

        }
    } satisfies ChartConfig

    console.log(chartBarConfig)


    return (
        <div className="h-full">
            <Card className="h-full">
                <CardTitle>Questions</CardTitle>
                {selectionQuestion === null && (
                    <CardContent className="grid grid-cols-3 gap-5 text-center">
                        {question.map(q => (
                            <Card key={q.id} className="lg:p-6 cursor-pointer" onClick={() => handleRenderforQId(q.id)}>
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
                                    <span className="font-bold">Cevabınız:</span> {answer[String(q.id)] || "Cevaplanmamış"} <br />
                                    <p className="font-bold">
                                        {feedback[q.id]?.ratingText || "Değerlendirme bekleniyor..."}
                                    </p>
                                </CardContent>
                                <CardContent>
                                    <Card className="flex flex-col">
                                        <CardHeader className="items-center pb-0">
                                            <CardTitle>Total Score</CardTitle>
                                            <CardDescription>{getScoreMessageForQuestion(Number(feedback[selectionQuestion]?.score))}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1 pb-0">
                                            <ChartContainer
                                                config={chartConfig}
                                                className="mx-auto aspect-square max-h-[250px]"
                                            >
                                                <RadialBarChart
                                                    data={chartData}
                                                    startAngle={-90}
                                                    endAngle={-90 + (Number(feedback[selectionQuestion]?.score) / 10) * 360}
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
                                                                                {feedback[selectionQuestion].score}
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
                                                {/* {totalScore > 25 ? "You are doing great!" : "Keep working on it!"} */}
                                            </div>
                                            <div className="leading-none text-muted-foreground">
                                                This score is based on your answers.
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </CardContent>
                                <Card>
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
                                                        dataKey="scor"
                                                        fill={chartBarConfig[key]?.color || 'var(--color-safari)'}
                                                        radius={8}
                                                    >
                                                        <LabelList dataKey="scor" formatter={(val: number) => `${val}`} color="white" />
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
                            Cevabınız: {answers[String(q.id)] || "Cevaplanmamış"}
                            <p>
                                Geri Bildirim:{" "}
                                {feedbacks[q.id]?.ratingText || "Değerlendirme bekleniyor..."}
                            </p>
                        </CardContent>
                    </Card>
                ))} */}
        </div>
    )
}
