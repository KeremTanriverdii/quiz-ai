"use client"
// 
import { useEffect, useState } from "react"
import { AiResp, Answers, Question, techField } from "./data/type"
import { Card, CardContent } from "./ui/card"
import { ChartConfig } from "./ui/chart"
import { Skeleton } from "./ui/skeleton"
import ChartsTotal from "./blocks/reusable/charts/ChartsTotal"
import ChartsBarScore from "./blocks/reusable/charts/ChartsBarScore"
import GetFeedback from "./blocks/reusable/charts/GetFeedback"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

export default function InterviewResult() {
    const [results, setResults] = useState<Record<number, AiResp>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [totalScore, setTotalScore] = useState<number>(0)
    const [techScore, setTechScore] = useState<techField[]>([])

    // Get sessionStorage data and loading state
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);

            const storedAnswers = sessionStorage.getItem("answers");
            const storedQuestions = sessionStorage.getItem("questions");
            const storedStack = sessionStorage.getItem("meta");

            // console.log("🔍 storedAnswers:", answers);
            // console.log("🔍 storedQuestions:", storedQuestions);

            if (!storedAnswers || !storedQuestions) return;

            try {
                const answers: Answers[] = JSON.parse(storedAnswers);
                const questions: Question[] = JSON.parse(storedQuestions);
                const stackArray = storedStack ? JSON.parse(storedStack) : [];

                const toArrayForAnswers = Object.values(answers);
                // console.log("✅ parsed answers:", answers);
                // console.log("✅ parsed questions:", questions)

                if (!Array.isArray(toArrayForAnswers)) {
                    console.error("❌ Answers array değil!", toArrayForAnswers);
                    return;
                }

                if (!Array.isArray(questions)) {
                    console.error("❌ Questions array değil!", questions);
                    return;
                }
                // const batchResult = await evaluateAnswers(questions, toArrayForAnswers, stackArray);
                // setResults(batchResult);
                setQuestions(questions)
            } catch (err) {
                console.error("❌ JSON parse veya evaluate hatası:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const getScoreMessage = (score: number): void => {
        // if (score >= 45) return data.ScoreMessage4
        // if (score >= 35) return data.ScoreMessage3
        // if (score >= 25) return data.ScoreMessage2
        // if (score >= 15) return data.ScoreMessage1
        // return data.ScoreMessage0
    }

    // const overallScore = Object.values(results).reduce((sum: any, res: any) => {
    //     const scoreSum = Object.values(res.score).reduce((s: any, v) => s + (v || 0), 0);
    //     return sum + scoreSum;
    // }, 0);

    const overallScore = Object.values(results).map(res => res.overall_score);
    console.log(overallScore)
    // Chart Cirlce Start
    const chartData = Object.keys(results).map((key) => {
        const res = results[Number(key)];
        return {
            name: `Q${key}`,
            score: res.overall_score,
            // fill: "var(--color-safari)",
        }
    }) as { name: string; score: number }[];
    console.log(chartData)
    const chartConfig = {
        score: {
            label: 'Score'
        }
    } satisfies ChartConfig
    // Chart Circle End

    // Chart Bar Start
    const chartBarData = techScore.flatMap(tech =>
        tech.fields.map(field => ({ name: field.field, score: field.score }))
    ) as { name: string; score: number }[]

    const chartBarConfig = {
        score: {
            label: 'Score'
        }
    } satisfies ChartConfig
    // Chart Bar End

    // Code Skill Bar Start
    const skillData = [
        {}
    ]
    // Code Skill Bar End
    console.log(Object.values(results).map(res => res.score))
    // Assagnment for totalScore and techScore states.
    useEffect(() => {
        if (!results || Object.keys(results).length === 0) return
        const total = Object.values(results).reduce((sum, fb) => sum + (fb.overall_score || 0), 0)
        const techScore: techField[] = Object.values(results).flatMap(res => res.professionTech || [])
        setTotalScore(total)
        setTechScore(techScore)
    }, [results])

    // useEffect for initial state
    useEffect(() => {
        if (Object.keys(results).length > 0) {
            console.log("Results hazır:", results)
        }
    }, [results])

    const getColorCardbyResult = (score: number) => {
        const x = Object.values(results).map(res => res.overall_score)
        if (score >= 45) return 'bg-green-500'
        if (score >= 35) return 'bg-yellow-300'
        if (score >= 25) return 'bg-orange-500'
        if (score <= 15) return 'bg-red-500'
        return 'bg-gray-400'
    }
    console.log('Result Value', Object.values(results).map(x => x))
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-17 gap-3">

            <div>
                {loading &&
                    <div className="row flex flex-col h-full">
                        <div className="row flex flex-col gap-5 h-full">
                            <Skeleton className="rounded-xl h-[500px] w-full" />
                            <Skeleton className="rounded-xl h-[500px] w-full" />
                        </div>
                    </div>
                }

                {!loading && Object.keys(results).length > 0 && (
                    <div className="flex flex-col gap-20 h-full justify- mb-10">
                        <ChartsTotal totalScore={totalScore} chartData={chartData} chartConfig={chartConfig} />
                        <ChartsBarScore chartBarData={chartBarData} chartBarConfig={chartBarConfig} techScors={techScore} />
                        <div className="col-span-2"></div>
                    </div>
                )}
            </div>

            <Card >
                <CardContent>
                    <div>Questions</div>
                    <div>Sorularının ayrıntılarına ve feedback almak için cardlara tıklayabilirsiniz.</div>
                    <div>24</div>
                    <GetFeedback question={questions} answer={results} />
                </CardContent>
            </Card>
            {!loading && Object.keys(results).length === 0 && (
                <p>Henüz değerlendirme yapılmadı.</p>
            )}
        </div>

    )
}