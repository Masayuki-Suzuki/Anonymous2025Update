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
            <div className="border border-gray flex items-center justify-between py-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH..."
                    className="focus:outline-none text-base text-primary placeholder:text-gray py-2 px-4 w-full h-full"
                />
                <span className="h-full">
                    <button
                        type="submit"
                        aria-label="Search"
                        className="w-full h-full flex items-center justify-center py-2 px-4 border-l border-gray"
                    >
                        <FontAwesomeIcon icon={faSearch} color="#777" size="lg" />
                    </button>
                </span>
            </div>
        </form>
    )
}

export default SearchBar
