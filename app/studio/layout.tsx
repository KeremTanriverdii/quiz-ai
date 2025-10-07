import { NextStudio } from 'next-sanity/studio'
// import { config } from '@/sanity.config'

export const metadata = {
    title: 'Sanity Studio',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
