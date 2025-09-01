import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { t } from 'i18next'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

export default function ChartsTotal({ totalScore, getScoreMessage, chartData, chartConfig }: {
    totalScore: number,
    getScoreMessage: (score: number, t: (key: string) => string) => string,
    chartData: any[],
    chartConfig: any
}) {

    const getColorbyScore = (score: number) => {
        if (score >= 70) return 'green';
        if (score >= 50) return 'yellow';
        return 'red';
    }
    return (
        <div>
            <Card className="flex flex-col">
                <Skeleton className="rounded-xl" />
                <CardHeader className="items-center pb-0">
                    <CardTitle>Total Score</CardTitle>
                    <CardDescription>{getScoreMessage(totalScore, t)}</CardDescription>
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
                            <RadialBar dataKey="puan" fill={getColorbyScore(totalScore)} background />
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
                                                        / 100
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
        </div>
    )
}
