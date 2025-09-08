"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { get } from 'http'
import { t } from 'i18next'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

export default function ChartsBarScore({ chartBarData, chartBarConfig, getScoreMessage, techScors, data }: {
    chartBarData: any[];
    chartBarConfig: Record<string, { label: string; color: string }>;
    getScoreMessage: (score: number, t: (key: string) => string) => string;
    techScors: any[];
    data: any
}) {
    const getColorbyScore = (score: number) => {
        if (score <= 4) return '#808080';
        if (score <= 6) return '#ADD8E6'
        return '#0000FF';
    }
    console.log(data)
    return (
        <div>
            <Card>
                <CardHeader>
                    {/* <CardTitle>{data.totalScore}</CardTitle> */}
                    {/* <CardDescription>{data.totalScoreDescription}</CardDescription> */}
                </CardHeader>
                <CardContent>
                    {getScoreMessage(techScors.reduce((a, b) => a + b.scors, 0), t)}
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
                                axisLine={true}
                            // tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            {Object.keys(chartBarConfig).map((key) => (
                                <Bar
                                    key={key}
                                    dataKey={"value"} // This should be the field name, e.g., 'score' or 'field'
                                    fill={getColorbyScore(techScors.find(item => item.name === key)?.scors)}
                                    radius={10}
                                    scale={"band"}
                                    barSize={80}
                                >
                                    <LabelList dataKey={"value"} position="top" offset={12} className="fill-foreground" fontSize={12} />
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
    )
}
