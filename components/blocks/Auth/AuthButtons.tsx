"use client"

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function AuthButtons() {

    return (
        <div className="flex gap-2">
            <Button onClick={() => signIn('github')}><Github /></Button>
            <Button onClick={() => signIn('google')}><Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="google-company-logo" width={20} height={20} /></Button>
        </div>
    )
}
