import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'zh', 'hi', 'tr', 'de', 'fr']
const defaultLocale = 'en'


export function middleware(request) {
    const { pathname } = request.nextUrl

    // URL zaten locale içeriyorsa dokunma
    const pathnameHasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    )
    if (pathnameHasLocale) return

    // Yoksa default locale ekle
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!_next|api|.*\\..*).*)',
    ],
}
