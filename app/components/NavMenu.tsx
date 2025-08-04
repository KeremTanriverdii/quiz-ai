"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";


function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <div className="flex items-center justify-between p-2 rounded-2xl">
                    <Image src='/interview-ai.png' width={50} height={50} alt="Interview-ai logo" />
                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={session.user?.image || "/default-avatar.png"} alt="User Avatar" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <button onClick={() => signOut()} className="btn btn-primary">
                                    Sign Out
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </>
        );
    } else {
        return (
            <>
                Not signed in <br />
                <button onClick={() => signIn('github')} className="btn btn-secondary">
                    Sign In with GitHub
                </button>
                <button onClick={() => signIn('google')} className="btn btn-secondary">
                    Sign In with Google
                </button>
            </>
        );
    }
}

export default function NavMenu() {
    return (
        <div>
            <AuthButton />
        </div>
    )
}