import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Button } from "./ui/button";
import LanguageChanger from "./Language";
import AuthButtons from "./blocks/Auth/AuthButtons";
import { Session } from "next-auth";
import Logout from "./blocks/Auth/Logout";
import Link from "next/link";

const linkItems = [
    { id: 0, title: 'Ana Sayfa', url: '/' },
    { id: 1, title: 'Özellikler', url: '/#features' },
    { id: 2, title: 'İletişim', url: 'contact' },
]


function AuthButton({ session }: { session: Session | null }) {

    if (!session) {
        return (
            <AuthButtons />
        )
    }
    return (
        <>
            <div className="flex items-center justify-between mb-2 p-2 bg-zinc-600">
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

                <div className="flex items-center gap-4 h">
                    <LanguageChanger />
                    {session &&
                        <DropdownMenu >
                            <DropdownMenuTrigger className="outline-none flex items-center gap-2">
                                {session.user?.name && <span className="p-2 hidden md:flex">{session.user?.name}</span>}
                                <Avatar>
                                    <AvatarImage src={session.user?.image || "/default-avatar.png"} alt="User Avatar" />
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



export default async function NavMenu({ user }: { user: Session | null }) {
    return (
        <div>
            <AuthButton session={user} />
        </div>
    )
}