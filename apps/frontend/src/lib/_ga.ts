'use client'

declare global {
    interface Window {
        dataLayer: any[]
        gtag: (...args: any[]) => void
    }
}

export function initConsent() {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
        window.dataLayer.push(arguments as any) as any
    }
    window.gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500,
    })
}

export function grantAnalytics() {
    window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
    })
}

export function denyAll() {
    window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
    })
}

// Event Utility
export function track(event: string, params?: Record<string, any>) {
    window.gtag?.('event', event, params || {})
}
