'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setSearchQuery('')

        if (!searchQuery) {
            router.push('/')
        }

        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <div className="border border-gray flex items-center justify-between">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH..."
                    className="focus:outline-none"
                />
                <button type="submit" aria-label="Search">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </form>
    )
}

export default SearchBar
