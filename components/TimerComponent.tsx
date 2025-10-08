"use client"
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";
import { Timer } from "lucide-react";

export default function TimerComponent() {
    const [timer, setTimer] = useState<number>(1500);
    const router = useRouter()
    useEffect(() => {
        const interval: number = window.setInterval(() => {
            setTimer((time) => {
                if (time === 0) {
                    clearInterval(interval)
                    alert('Süreniz doldu! Şimdi sonuç ekranına yönlendiriliyorsunuz!')
                    router.push('/interview/result')
                    return 0
                } else return time - 1;
            });
        }, 1000)
        return () => clearInterval(interval)
    }, [router]);

    return (
        <div>
            <Card className="p-4 mt-20 h-fit lg:mt-50">
                <p className="font-bold flex items-center justify-center gap-2" >Kalan Süre <Timer /></p>
                <div className="flex flex-col">
                    <span className={`self-end font-bold text-2xl ${timer <= 500 ? 'text-red-500' : 'text-white'}`}>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                    </span>
                    <Progress value={(timer / 1500) * 100} className="h-4 rounded-full mt-4" />
                </div>
            </Card>
        </div>
    )
}
