"use client"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ShieldX } from "lucide-react";
import { Progress } from "../ui/progress";

export type langProps = {
    back: string;
    based: string;
    FieldScore: string;
    hint: string;
    keep: string;
    next: string;
    questions: string;
    ScoreMessage0: string;
    ScoreMessage1: string;
    ScoreMessage2: string;
    ScoreMessage3: string;
    ScoreMessage4: string;
    showResut: string;
    start: string;
    totalScore: string;
    welcome: string;
    preparation: string;
    formlevel: string;
    selectField: string;
    informNext: string;
    interviewLayout: string;
    choosenLevel: string;
    choosenField: string;
    yourAnswer: string;
    totalScoreDescription: string;
    home: string;
    contact: string;
    features: string;
    subHead: string;
    sectionHeader: string;
    sectionParagrafh: string;
    selection: string;
    error: string;
}

export default function StartButton({ lang, userLog }: { lang: langProps, userLog: Session | null }) {
    // direct form page if not fast loading show loading state.
    const [loading, setLoading] = useState<boolean>(false);
    // if user not log show alert card
    const [showAlert, setShowAlert] = useState<boolean>(false);
    // If user not logged alert display inside show the progress bar for 3 second
    const [progress, setProgress] = useState<number>(0);
    // if user logged direct form page
    const router = useRouter();
    // dict for internationalization
    const dict = lang
    // client side check login user if click start button
    const session = userLog

    // user loggin check and push form page
    const handleClick = () => {
        if (!session) {
            setShowAlert(true)
        } else {
            setLoading(true);
            router.push('/form')
        }
    }

    // progress 3 seconds and show 3 seconds alert components
    useEffect(() => {
        if (!showAlert) return;

        const duration = 3000;
        const intervalTime = 50;
        const totalSteps = duration / intervalTime;
        const increment = 100 / totalSteps

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= 100) {
                current = 100;
                setShowAlert(false)
                clearInterval(timer)
            }
            setProgress(current);
        }, intervalTime)
        return () => { clearInterval(timer) }

    }, [showAlert])

    return (
        <div >

            {loading ? <div className="animate-spin">Loading</div> : (
                <div>
                    <Button
                        onClick={handleClick}
                        className={`bg-white text-black mx-auto ${showAlert ? '' : ''}`}
                    >
                        {dict.start}
                    </Button>
                </div>
            )}
            {showAlert && (
                <Alert variant={'destructive'} className="absolute bottom-2 right-2 w-fit">
                    <ShieldX />
                    <AlertTitle>{dict.error}</AlertTitle>
                    <AlertDescription>
                        <Progress value={progress} className="h-1 mt-2" />
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}
