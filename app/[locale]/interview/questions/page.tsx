import ResultClient from "@/components/ResultClient";
import { getDictionary } from "../../dictionaries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Session } from "inspector/promises";
import QuestionInfo from "@/components/QuestionInfo";
import { Card, CardTitle } from "@/components/ui/card";
import TimerComponent from "@/components/TimerComponent";



export async function generateStaticParams() {
    const locales = ["tr", "fr", "en", "de", "hi", "zh"] as const;

    return locales.map((locale) => ({
        locale,
    }));
}
interface PageProps {
    params: {
        locale: "tr" | "fr" | "en" | "de" | "hi" | "zh";
    };
    searchParams?: any;
}


export default async function page({ params }: PageProps) {
    const { locale } = await params;
    const session = await getServerSession(authOptions);
    const disc = await getDictionary(locale);
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:gap-5 gap-y-3 mx-2">
            <Card className="p-4 mt-2 row-span-3 h-fit lg:mt-20">
                <CardTitle>{disc.questions}</CardTitle>
                {session?.user && <p>{session.user.name}</p>}
                <QuestionInfo />
                <TimerComponent />
            </Card>
            <ResultClient data={disc} user={session} />
        </div>
    )
}
