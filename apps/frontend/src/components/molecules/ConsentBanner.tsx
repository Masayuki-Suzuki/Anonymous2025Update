'use client'
import { useEffect, useState } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!

export default function ConsentBanner() {
    const [visible, setVisible] = useState(false)
    const [granted, setGranted] = useState<boolean | null>(null)

    useEffect(() => {
        const v = localStorage.getItem('analytics-consent')
        if (v === 'granted') setGranted(true)
        else if (v === 'denied') setGranted(false)
        else setVisible(true)
    }, [])

    const loadGA = () => {
        // 仮の gtag 関数と Consent Mode 初期値
        window.dataLayer = window.dataLayer || []
        window.gtag = function () {
            window.dataLayer.push(arguments)
        }
        window.gtag('consent', 'default', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
        })

        // gtag.js を動的ロード
        const script = document.createElement('script')
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
        script.async = true
        script.crossOrigin = 'anonymous'
        script.onload = () => {
            // 本体ロード完了後に初期化
            window.gtag('js', new Date())
            window.gtag('config', GA_ID, { anonymize_ip: true })
        }
        document.head.appendChild(script)
    }

    const onAccept = () => {
        loadGA()
        localStorage.setItem('analytics-consent', 'granted')
        setGranted(true)
        setVisible(false)
    }

    const onDecline = () => {
        // Consent Mode を全拒否に更新
        window.dataLayer = window.dataLayer || []
        window.gtag = function () {
            window.dataLayer.push(arguments)
        }
        window.gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        })

        localStorage.setItem('analytics-consent', 'denied')
        setGranted(false)
        setVisible(false)
    }

    // ページ再訪時に既に同意済みなら自動ロード
    useEffect(() => {
        if (granted) loadGA()
    }, [granted])

    if (!visible) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl p-4 bg-black/90 text-white">
            We use cookies to analyze traffic with Google Analytics 4 (GA4). Do you agree to the use of these cookies?
            <div className="mt-3 flex gap-2">
                <button className="rounded-lg px-3 py-2 bg-white/10" onClick={onAccept}>
                    Accept
                </button>
                <button className="rounded-lg px-3 py-2 bg-white/10" onClick={onDecline}>
                    Decline
                </button>
            </div>
        </div>
    )
}
