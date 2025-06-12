import './globals.css'
import { Lato } from 'next/font/google'
import Header from '@/components/organisms/Header'
import SideNavigation from '@/components/organisms/SideNavigation'

const lato = Lato({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <Header />
                <div>
                    <main>{children}</main>
                    <aside>
                        <SideNavigation />
                    </aside>
                </div>
            </body>
        </html>
    )
}
