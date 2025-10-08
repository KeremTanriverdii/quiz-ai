import ResultClient from "@/components/ResultClient";
import { getDictionary } from "../../dictionaries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import QuestionInfo from "@/components/QuestionInfo";
import { Card, CardTitle } from "@/components/ui/card";
import TimerComponent from "@/components/TimerComponent";
import { generateQuestion } from "../action";
import { cookies } from "next/headers";
import FullscreenQuiz from "@/components/blocks/reusable/charts/FullScreenQuiz";


export type Questionsa = {
    _id: string
    type: 'open' | 'mvc'
    questionText: string
    difficulty: number
    options?: { label: string; optionText: string }[]
    templates?: { templateCode: string }[]
    tech: string;
    hintText: string;
}
export interface PageProps {
    params: {
        locale: 'tr' | 'en' | 'hi' | 'de' | 'fr' | 'zh',
        // questions: Questionsa[]
    }
}


export default async function page({ params }: { params: Promise<PageProps['params']> }) {
    const { locale } = await params;
    const session = await getServerSession(authOptions);
    const disc = await getDictionary(locale);
    const cookieStore = await cookies();
    const level = cookieStore.get('level')?.value as string | undefined;
    const stack = cookieStore.get('stack')?.value as string | undefined;
    const lang = cookieStore.get('lang')?.value as string | undefined;
    const question = await generateQuestion(level || '', stack || '', lang || '');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch justify-center gap-2 md:m-10">
            {/* <div className="flex gap-5 justify-center items-stretch h-full"> */}
            <Card className="my-auto h-full p-4  ">
                <CardTitle>{disc.questions}</CardTitle>
                {session?.user && <p>{session.user.name}</p>}
                <QuestionInfo />
                <TimerComponent />
            </Card>

            <div className="col-span-2">
                <FullscreenQuiz>
                    <ResultClient data={disc} user={session}
                        question={question}
                    />
                </FullscreenQuiz>
            </div>
            {/* </div> */}
        </div>
    )
}
