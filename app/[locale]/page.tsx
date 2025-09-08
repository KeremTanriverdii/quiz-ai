import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
export default async function Home({ params, }: { params: Promise<{ locale: 'en' | 'tr' | 'fr' | 'de' | 'hi' | 'zh' }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale);
  if (!dict) {
    return <div>Dictionary not found </div>
  }
  return (
    <div className="flex items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">{dict.welcome}</p>
        <Button className="mt-4 dark:bg-white mx-auto">
          <Link href='/form'>{dict.start}</Link>
        </Button>
      </main>

    </div>
  );
}