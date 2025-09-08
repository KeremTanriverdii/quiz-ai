import InterviewResult from "@/components/Result";
import { getDictionary } from "../../dictionaries";

export default async function page({ params }: { params: { locale: 'en' | 'tr' | 'zh' | 'de' | 'fr' | 'hi' } }) {
    const { locale } = await params;
    const disc = await getDictionary(locale);
    return <InterviewResult data={disc} />
}
