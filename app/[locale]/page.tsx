import { Button } from "@/components/ui/button";
import Link from "next/link";
import initTranslations from "../i18n";
export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ['q2']);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Welcome to Quiz AI</p>
        <Button className="mt-4 dark:bg-white">
          <Link href='/form'>{t('start')}</Link>
        </Button>
      </main>

    </div>
  );
}