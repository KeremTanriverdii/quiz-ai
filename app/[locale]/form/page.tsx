import FormWizard from "@/components/blocks/form/FormWizard";
import { getDictionary } from "../dictionaries";
import { PageProps } from "../interview/questions/page";

export default async function page({ params }: { params: Promise<PageProps['params']> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale)
    return (
        <>
            <FormWizard data={dict} />
        </>
    )
}
