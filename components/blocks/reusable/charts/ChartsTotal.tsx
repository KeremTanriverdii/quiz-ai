import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { Bubbles, TrendingUp } from 'lucide-react'
import React from 'react'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

interface ChartsTotalProps {
    totalScore: number  // <-- just overall_score field
    getScoreMessage?: (score: number) => string | undefined,
    chartData: { score: any, name: string }[]
    chartConfig: ChartConfig
    data?: any
}

export default function ChartsTotal({
    totalScore,
    chartConfig,
    data,
    chartData,
    getScoreMessage
}: ChartsTotalProps) {
    // const datax = data || null

    const getColorbyScore = (score: number) => {
        if (score >= 360) return 'green';
        if (score >= 120) return 'yellow';
        return 'red';
    }
    const maxValue = totalScore <= 50 ? 50 : 500
    return (
        <Card>
            <CardHeader className="items-center pb-0">
                <CardTitle>Radial Chart - Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={-90}
                        endAngle={-90 + (totalScore / maxValue) * 360}
                        innerRadius={80}
                        outerRadius={140}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke='white'
                            enableBackground={'false'}
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86]}
                        />
                        <RadialBar dataKey="score" fill={getColorbyScore(totalScore)} cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cx}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {totalScore <= maxValue ? totalScore : maxValue}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
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
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
            {/* <Card className="flex flex-col">
                <Skeleton className="rounded-xl" />
                <CardHeader className="items-center pb-0">
                    <CardDescription className='flex gap-2'>This score is based on your answers <Bubbles /> </CardDescription>
                    <CardTitle>Genel Değerlendirme Puanı: <span className='font-bold'>{getScoreMessage && getScoreMessage(totalScore)}</span></CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <RadialBarChart
                            data={chartData}
                            startAngle={-90}
                            endAngle={-90 + (totalScore / maxValue) * 360}
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
                            <RadialBar dataKey="score" fill={getColorbyScore(totalScore)} background />
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
                                                        /{totalScore <= 50 ? 50 : 500}
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
                        {getScoreMessage && getScoreMessage(totalScore)}
                    </div>
                </CardFooter>
            </Card> */}
        </Card>
    )
}
