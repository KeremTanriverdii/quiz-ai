"use client";

import { useRouter, usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function LanguageChanger() {
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (locale: string) => {
        const segments = pathname.split('/');
        segments[1] = locale; // URL segmentini değiştir
        router.push(segments.join('/'));

        // Cookie set et
        document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    };


    return (
        <Select onValueChange={changeLanguage}>
            <SelectTrigger className="bg-zinc-700 text-white">
                <SelectValue placeholder={"Language"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {(['en', 'de', 'hi', 'zh', 'fr', 'tr'] as string[]).map((locale) => (
                        <SelectItem key={locale} value={locale}>
                            {locale}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}