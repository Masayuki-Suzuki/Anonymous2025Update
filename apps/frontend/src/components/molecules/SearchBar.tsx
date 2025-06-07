'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="SEARCH..."
        className="px-3 py-1 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 focus:outline-none"
        aria-label="Search"
      >
        <i className="fas fa-search"></i>
      </button>
    </form>
  )
}

export default SearchBar
