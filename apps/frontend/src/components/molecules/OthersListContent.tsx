import Link from 'next/link'
import EmptyState from '../atoms/EmptyState'

type OtherPage = {
    title: string
    path: string
}

type OthersListContentProps = {
    pages: OtherPage[]
}

/**
 * OthersListContent component - displays the list of other pages
 */
const OthersListContent = ({ pages }: OthersListContentProps) => {
    return (
        <div className="mt-2.5">
            {pages.length === 0 ? (
                <EmptyState message="No other pages found" />
            ) : (
                <ul>
                    {pages.map((page) => (
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

export default OthersListContent
