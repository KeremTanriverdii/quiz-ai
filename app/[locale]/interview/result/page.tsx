import InterviewResult from "@/components/Result";
import { getDictionary } from "../../dictionaries";

export default async function page({ params }: { params: any }) {
    const { locale } = params;
    const disc = await getDictionary(locale);
    return <InterviewResult data={disc} />
}
