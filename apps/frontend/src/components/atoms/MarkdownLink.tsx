import Link from 'next/link'
import React from 'react'

type MarkDownLinkProps = {
    href: string
    children: string | string[]
}

function MarkdownLink({ href, children }: MarkDownLinkProps) {
    const isExternalLink = href.startsWith('http')
    const className =
        'text-secondary font-medium hover:text-secondary-hover transition-colors duration-300 ease-in-out hover:no-underline cursor-pointer'

    if (isExternalLink) {
        return (
            <a className={className} href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        )
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}

export default MarkdownLink
