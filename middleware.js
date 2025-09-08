import { NextResponse } from 'next/server'

const locales = ['en', 'zh', 'hi', 'tr', 'de', 'fr']
const defaultLocale = 'en'


export function middleware(request) {
    const { pathname } = request.nextUrl

    // URL zaten locale içeriyorsa dokunma
    const pathnameHasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    )
    if (pathnameHasLocale) {
        return NextResponse.next()
    }


    const cookieLocal = request.cookies.get('NEXT_LOCALE')

    const locale = cookieLocal && locales.includes(cookieLocal.value) ? cookieLocal.value : defaultLocale

    // Yoksa default locale ekle
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!_next|api|.*\\..*).*)',
    ],
}
