import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID || '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role ?? "user";
                token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
            }
            if (trigger === 'update' && !token.exp) {
                token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
            }
            if (Date.now() / 1000 < (token.exp as number)) {
                return token; // <-- FIXED
            }

            token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = (token.role as string) ?? "user";
            }
            session.expires = token.exp
                ? new Date((token.exp as number) * 1000).toISOString()
                : ""; // <-- FIXED
            return session;
        },
    },
};