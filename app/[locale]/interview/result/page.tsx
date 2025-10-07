import InterviewResult from "@/components/Result";
import { getDictionary } from "../../dictionaries";
import { PageProps } from "../questions/page";

export default async function page({ params }: { params: Promise<PageProps['params']> }) {
    const { locale } = await params;
    const disc = await getDictionary(locale);
    return <InterviewResult
    // data={disc}
    />
}
