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

        if (!["tr", "en", "de", "fr", "zh", "hi"].includes(segments[1])) {
            segments.splice(1, 0, locale); // if there is no locale in the path, add it
        } else {
            segments[1] = locale; // if there is a locale, change it
        }


        router.push(segments.join('/'));
        // Set cookie
        document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    }

    const currentLocale = ['tr', 'en', 'de', 'fr', 'zh', 'hi'].includes(pathname.split('/')[1]) ? pathname.split('/')[1] : 'en';

    return (
        <Select onValueChange={changeLanguage} defaultValue={currentLocale}>
            <SelectTrigger className="bg-zinc-700 text-white">
                <SelectValue placeholder={"Lang"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="tr">tr</SelectItem>
                    <SelectItem value="en">en</SelectItem>
                    <SelectItem value="de">de</SelectItem>
                    <SelectItem value="fr">fr</SelectItem>
                    <SelectItem value="hi">hi</SelectItem>
                    <SelectItem value="zh">zh</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}