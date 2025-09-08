"use client"

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function QuestionProgress({ id }: { id: string }) {
    const value = Number(id) || 0;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalQuestions = 10; // total question
        setProgress((value / totalQuestions) * 100);
    },)
    return <Progress value={progress} className="w-full" />;
}
