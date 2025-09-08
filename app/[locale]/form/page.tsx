import FormWizard from "@/components/blocks/form/FormWizard";
import { getDictionary } from "../dictionaries";

export default async function page({ params }: { params: Promise<{ locale: 'en' | 'tr' | 'fr' | 'de' | 'hi' | 'zh' }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale)
    return (
        <>
            <FormWizard data={dict} />
        </>
    )
}
