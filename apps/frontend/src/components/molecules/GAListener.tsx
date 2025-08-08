'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
    interface Window {
        gtag: (...args: any[]) => void
    }
}

export default function GAListener({ gaId }: { gaId: string }) {
    const pathname = usePathname()
    const search = useSearchParams()

    useEffect(() => {
        if (!gaId) return
        // Nothing happens if users have not granted consent.
        window.gtag?.('event', 'page_view', {
            page_location: window.location.href,
            page_path: pathname + (search?.toString() ? `?${search}` : ''),
            page_title: document.title,
        })
    }, [gaId, pathname, search])

    return null
}
