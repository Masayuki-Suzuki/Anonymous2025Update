'use client'

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import PaginationButton from '../atoms/PaginationButton'
import usePagination from '@/lib/usePagination'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const updateUrlWithoutNavigation = usePagination()

    const handlePageChange = (newPage: number) => {
        if (newPage === currentPage || newPage < 1 || newPage > totalPages) return
        updateUrlWithoutNavigation(newPage)
        onPageChange(newPage)
    }

    return (
        <div className="pagination mt-12 flex items-center justify-end py-5 px-3 w-95pct border-y border-gray gap-4">
            <PaginationButton
                direction="left"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            />
            {/*<PaginationButton direction="left" onClick={handlePrevPage} disabled={currentPage <= 1} />*/}
            <span className="font-lato text-mid-gray text-xl leading-none tracking-widest">
                {currentPage}/{totalPages}
            </span>
            <PaginationButton
                direction="right"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            />
            {/*<PaginationButton direction="right" onClick={handleNextPage} disabled={currentPage >= totalPages} />*/}
        </div>
    )
}
