'use client'

import Link from 'next/link'
import { otherPages } from '@/lib/otherPages'

const ClientOthersList = () => {
  return (
    <div>
      <h3>others</h3>
      <div>
        {otherPages.length === 0 ? (
          <p>No other pages found</p>
        ) : (
          <ul>
            {otherPages.map((page) => (
              <li key={page.path}>
                <Link href={page.path}>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ClientOthersList
