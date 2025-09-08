"use client"

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

export default function AuthButtons() {

    return (
        <div className="flex gap-2">
            <Button onClick={() => signIn('github')}>Sign In With Google</Button>
            <Button onClick={() => signIn('google')}>Sign In With Github</Button>
        </div>
    )
}
