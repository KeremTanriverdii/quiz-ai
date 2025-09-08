import FormWizard from "@/components/blocks/form/FormWizard";
import { getDictionary } from "../dictionaries";

export default async function page({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const disc = await getDictionary(locale);
    return (
        <div>
            <FormWizard data={disc} />
        </div>
    )
}
