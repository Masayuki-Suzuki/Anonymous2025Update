import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface PaginationButtonProps {
    direction: 'left' | 'right'
    onClick?: () => void | undefined
    disabled: boolean
    url: string
}

export default function PaginationButton({ direction, onClick, disabled, url }: PaginationButtonProps) {
    if (disabled)
        return (
            <span
                className="pagination-button disabled"
                aria-label={direction === 'left' ? 'Previous page' : 'Next page'}
                aria-disabled
            >
                <FontAwesomeIcon
                    icon={direction === 'left' ? faAngleLeft : faAngleRight}
                    color="#aaa"
                    fontSize={22}
                    className="leading-0"
                />
            </span>
        )

    if (!onClick) {
        return (
            <Link
                href={url}
                className="pagination-button"
                aria-label={direction === 'left' ? 'Previous page' : 'Next page'}
            >
                <FontAwesomeIcon
                    icon={direction === 'left' ? faAngleLeft : faAngleRight}
                    color="#aaa"
                    fontSize={22}
                    className="leading-0"
                />
            </Link>
        )
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`pagination-button ${disabled ? 'disabled' : ''}`}
            aria-label={direction === 'left' ? 'Previous page' : 'Next page'}
        >
            <FontAwesomeIcon
                icon={direction === 'left' ? faAngleLeft : faAngleRight}
                color="#aaa"
                fontSize={22}
                className="leading-0"
            />
        </button>
    )
}
