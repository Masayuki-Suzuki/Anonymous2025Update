'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationButtonProps {
    direction: 'left' | 'right'
    onClick: () => void
    disabled: boolean
}

export default function PaginationButton({ direction, onClick, disabled }: PaginationButtonProps) {
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
