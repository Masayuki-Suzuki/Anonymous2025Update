import './globals.css'
import { Lato } from 'next/font/google'
import Header from '@/components/organisms/Header'
import SideNavigation from '@/components/organisms/SideNavigation'
import Footer from '@/components/organisms/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Script from 'next/script'
import ConsentBanner from '@/components/molecules/ConsentBanner'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

const lato = Lato({
    weight: ['300', '400', '700'],
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
                <div className="w-95pct max-w-base mx-auto md:flex">
                    <main className="md:w-2/3">{children}</main>
                    <aside className="mt-16 md:mt-10 lg:mt-16 md:w-1/3">
                        <SideNavigation />
                    </aside>
                </div>
                <Footer />
                <Script id="ga-consent-init" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){ window.dataLayer.push(arguments); };
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
                </Script>
                <ConsentBanner />
            </body>
        </html>
    )
}
