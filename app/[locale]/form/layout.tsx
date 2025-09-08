import { getDictionary } from "../dictionaries";

export default async function FormLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: 'tr' | 'en' | 'de' | 'fr' | 'zh' | 'hi' }> }) {
    const { locale } = await params;
    const disc = await getDictionary(locale);
    return (
        <div className="p-8 border rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">{disc.interviewLayout}</h1>
            {children}
        </div>
    );
}
