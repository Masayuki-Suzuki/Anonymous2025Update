import './globals.css'
import { Lato } from 'next/font/google'
import Header from '@/components/organisms/Header'
import SideNavigation from '@/components/organisms/SideNavigation'
import Footer from '@/components/organisms/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

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
                <Footer />
            </body>
        </html>
    )
}
