import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
export default async function Home({ params, }: { params: Promise<{ locale: 'en' | 'tr' | 'fr' | 'de' | 'hi' | 'zh' }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale);
  console.log(dict)
  if (!dict) {
    return <div>Dictionary not found </div>
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Welcome to Quiz AI</p>
        <Button className="mt-4 dark:bg-white">
          <Link href='/form'>{dict.start}</Link>
        </Button>
      </main>

    </div>
  );
}