import usePagination from '@/lib/usePagination'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PaginationButton from '@/components/atoms/PaginationButton'

type PostPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => Promise<void>
}

function PostPagination({ currentPage, totalPages, onPageChange }: PostPaginationProps) {
    const updateUrlWithoutNavigation = usePagination()
    const searchParams = useSearchParams()

    // Local state to track current page
    const [page, setPage] = useState(currentPage)

    useEffect(() => {
        const newPage = Number(searchParams.get('p')) || 1
        updatePage(newPage, false)
    }, [searchParams])

    const updatePage = (newPage: number, withURL = true) => {
        setPage(newPage)
        if (withURL) {
            updateUrlWithoutNavigation(newPage)
        }
        void onPageChange(newPage)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage === page || newPage < 1 || newPage > totalPages) return
        updatePage(newPage)
    }

    return (
        <div className="pagination mt-12 flex items-center justify-end py-5 px-3 w-full md:w-95pct border-y border-gray gap-4">
            <PaginationButton direction="left" onClick={() => handlePageChange(page - 1)} disabled={page <= 1} />
            <span className="font-lato text-mid-gray text-xl leading-none tracking-widest">
                {page}/{totalPages}
            </span>
            <PaginationButton
                direction="right"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
            />
        </div>
    )
}

export default PostPagination
