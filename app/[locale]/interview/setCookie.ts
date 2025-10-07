"use server"

import { cookies } from "next/headers"

export async function serCookie(formData: FormData) {
    const cookieStore = await cookies();
    const level = formData.get('level') as string;
    const stackRaw = formData.get('stack') as string;
    const lang = cookieStore.get('NEXT_LOCALE')?.value;

    cookieStore.set('level', level);
    cookieStore.set('stack', stackRaw);
    if (lang) {
        cookieStore.set('lang', lang);
    }
}