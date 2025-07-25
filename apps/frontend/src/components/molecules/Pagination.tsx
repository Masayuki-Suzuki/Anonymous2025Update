'use client'

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import PaginationButton from '../atoms/PaginationButton'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return params.toString()
    }

    // Update URL without navigation
    const updateUrlWithoutNavigation = (page: number) => {
        const newUrl = `${pathname}?${createQueryString('p', page.toString())}`
        window.history.pushState({}, '', newUrl)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1
            updateUrlWithoutNavigation(newPage)
            onPageChange(newPage)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1
            updateUrlWithoutNavigation(newPage)
            onPageChange(newPage)
        }
    }

    return (
        <div className="pagination mt-12 flex items-center justify-end py-5 px-3 w-95pct border-y border-gray gap-4">
            <PaginationButton direction="left" onClick={handlePrevPage} disabled={currentPage <= 1} />
            <span className="font-lato text-mid-gray text-xl leading-none tracking-widest">
                {currentPage}/{totalPages}
            </span>
            <PaginationButton direction="right" onClick={handleNextPage} disabled={currentPage >= totalPages} />
        </div>
    )
}
