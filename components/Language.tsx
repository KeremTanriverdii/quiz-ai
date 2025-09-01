import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";

export default function Language() {
    const [lang, setLang] = useState<string>('en-US');

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger >
                    <Button variant={"outline"}>{lang}</Button>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href="/" locale="en-US" >en</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" locale="tr-TR">tr</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" locale="hi">hi</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" locale="ch-ZW">ch</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" locale="fr">fr</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenuTrigger>
            </DropdownMenu>

        </div>
    )
}
