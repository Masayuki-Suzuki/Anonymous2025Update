import { ReactNode } from 'react'

type ListWrapperProps = {
    title: string
    children: ReactNode
}

/**
 * ListWrapper component - provides a consistent wrapper for list components
 * Used by CategoryList, RecentPostsList, ArchiveList, OthersList, and AboutWidget
 */
const ListWrapper = ({ title, children }: ListWrapperProps) => {
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">{title}</h3>
            {children}
        </div>
    )
}

export default ListWrapper
