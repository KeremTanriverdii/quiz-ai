"use client";

import { useSession, signIn, signOut } from "next-auth/react";


function AuthButton() {
    const { data: session } = useSession();
    console.log("Session:", session);
    if (session) {
        return (
            <>
                {session.user?.name} <br />
                <button onClick={() => signOut()} className="btn btn-primary">
                    Sign Out
                </button>
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