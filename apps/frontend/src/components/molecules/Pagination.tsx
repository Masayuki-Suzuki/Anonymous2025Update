import PaginationButton from '../atoms/PaginationButton'

interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    const getPaginationUrl = (page: number) => `${baseUrl}${page}`

    return (
        <div className="pagination mt-12 flex items-center justify-end py-5 px-3 w-95pct border-y border-gray gap-4">
            <PaginationButton direction="left" disabled={currentPage <= 1} url={getPaginationUrl(currentPage - 1)} />
            <span className="font-lato text-mid-gray text-xl leading-none tracking-widest">
                {currentPage}/{totalPages}
            </span>
            <PaginationButton
                direction="right"
                disabled={currentPage >= totalPages}
                url={getPaginationUrl(currentPage + 1)}
            />
        </div>
    )
}
