import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { PageProps } from "./interview/questions/page";
import StartButton from "@/components/blocks/StartButton";
import { getServerSession } from "next-auth";
export default async function Home({ params, }: { params: Promise<PageProps['params']> }) {
  const { locale } = await params
  const dict = await getDictionary(locale);
  if (!dict) {
    return <div>Dictionary not found </div>
  }
  const session = await getServerSession();
  return (
    <div className="flex justify-center items-center">
      <main className="w-full h-[80vh] ">
        <Card className="rounded-4xl bg-[url(/bgcard.png)] bg-cover bg-center bg-no-repeat lg:p-5 h-4/4 shadow-2xl shadow-blue-500/70">
          <div className="mt-10 text-center flex flex-col gap-10">
            <p className="w-fit mx-auto flex gap-3 bg-neutral-800 text-white text-center justify-center rounded-full border-2 border-white bg-roun p-2"><Star /> Al Powered</p>
            <p className="text-7xl font-bold text-white text-center">{dict.welcome}</p>
            <span className="text-center text-gray-600 font-bold">{dict.subHead}</span>

            <StartButton lang={dict} userLog={session} />
          </div>

          <div className="flex flex-wrap gap-5 justify-evenly items-stretch h-1/3 mt-auto">
            <Card className="flex w-auto">
              <CardTitle className="text-2xl">
                <CardHeader>{dict.sectionHeader}</CardHeader>
              </CardTitle>
              <CardContent className="flex flex-col">
                {/* <Image src='/illustration.png' width={128} height={120} alt="illustration" className="rounded-full" /> */}
                <p className="max-w-2xl">
                  {dict.sectionParagrafh}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardTitle className="py-4">
                <CardHeader className="text-2xl">{dict.selection}</CardHeader>
              </CardTitle>
              <CardContent className="grid grid-cols-2 gap-2 w-auto h-auto">
                <Card className="rounded-2xl bg-neutral-800 p-2">Frontend Developer</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">Backend Developer</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">Devops/SRE Developer</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">Fullstack Developer</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">Mobile Developer</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">Data Scientist / Al & ML Engineer</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">CyberSecurity Specialist</Card>
                <Card className="rounded-2xl bg-neutral-800 p-2">BI </Card>

              </CardContent>
            </Card>
          </div>
        </Card>
      </main>

    </div>
  );
}