'use client'

import Link from 'next/link'
import { otherPages } from '@/lib/otherPages'

const ClientOthersList = () => {
    return (
        <div className="mt-2.5">
            {otherPages.length === 0 ? (
                <p>No other pages found</p>
            ) : (
                <ul>
                    {otherPages.map((page) => (
                        <li key={page.path} className="py-1">
                            <Link
                                href={page.path}
                                className="capitalize text-primary font-sm hover:text-secondary transition-colors duration-300 ease-in-out"
                            >
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ClientOthersList
