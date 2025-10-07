import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import LanguageChanger from "./Language";
import AuthButtons from "./blocks/Auth/AuthButtons";
import { Session } from "next-auth";
import Logout from "./blocks/Auth/Logout";
import Link from "next/link";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { langProps } from "./blocks/StartButton";
import { PageProps } from "@/app/[locale]/interview/questions/page";



function AuthButton({ session, localeData }: { session: Session | null; localeData: langProps }) {
    const { home, contact, features } = localeData
    const linkItems = [
        { id: 0, title: `${home}`, url: '/' },
        { id: 1, title: `${features}`, url: '/features' },
        { id: 2, title: `${contact}`, url: '/contact' },
    ]
    return (
        <>
            <div className="flex items-center justify-between mb-2 p-2 lg:px-5 border-2 rounded-full md:mt-3 md:w-2/3 md:mx-auto border-zinc-800 ">
                <Link href='/'>
                    <Image src='/withai.png' width={50} height={50} alt="Interview-ai logo" className="rounded-full" />
                </Link>

                <div className="hidden md:flex gap-5 font-semibold">
                    {linkItems.map((item) => (
                        <Link href={item.url} key={item.id}>
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4 ">
                    <LanguageChanger />
                    {!session && <AuthButtons />}
                    {session &&
                        <DropdownMenu >
                            <DropdownMenuTrigger className="outline-none flex items-center gap-2">
                                {session.user?.name && <span className="p-2 hidden md:flex">{session.user?.name}</span>}
                                <Avatar>
                                    <AvatarImage src={session.user?.image || 'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'} alt="User Avatar" />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Logout />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </div>
        </>
    );
}

interface NavbarProps {
    session: Session | null
    localeData: langProps
}

export default async function NavMenu({ session, localeData }: NavbarProps) {
    return (
        <div className="row-start-1 row-span-1">
            <AuthButton session={session} localeData={localeData} />
        </div>
    )
}