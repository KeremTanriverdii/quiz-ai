import FormWizard from "@/components/blocks/form/FormWizard";
import { getDictionary } from "../dictionaries";
import { PageProps } from "./questions/page";

export default async function Page({ params }: PageProps) {
    const { locale } = params; // artık await yok
    const disc = await getDictionary(locale);
    return (
        <div>
            <FormWizard data={disc} />
        </div>
    )
}
