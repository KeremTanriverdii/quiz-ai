import NextAuth, { Account, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

// Extend the Session type to include accessToken and id
declare module "next-auth" {
    interface Session {
        accessToken?: string;
        id?: string | number;
    }
}

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string ?? '',
            clientSecret: process.env.AUTH_GITHUB_SECRET as string ?? '',
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string ?? '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string ?? '',
        }),
    ],
    // callbacks: {
    //     async jwt({ token, account }: { token: JWT; account: Account | null }) {
    //         // account objesi sadece ilk kez giriş yapıldığında gelir
    //         if (account) {
    //             token.accessToken = account.access_token; // access_token'ı JWT'ye ekliyoruz
    //             token.id = account.id; // Kullanıcıyı tanımlayan ID'yi ekliyoruz
    //         }
    //         return token;
    //     },

    //     async session({ session, token }: { session: Session; token: JWT }) {
    //         if (token) {
    //             session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined; // JWT'deki access token'ı session'a ekliyoruz
    //             session.id = token.id as string | number | undefined; // Kullanıcı ID'sini session'a ekliyoruz
    //         }
    //         return session;
    //     },
    // },
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };