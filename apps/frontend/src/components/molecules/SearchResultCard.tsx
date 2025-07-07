'use client'

import { SearchPostsQuery } from '@/generated/graphql'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { getFormattedDates } from '@/lib/dateUtils'

type SearchResultCardProps = {
  post: NonNullable<SearchPostsQuery['posts'][number]>
}

const SearchResultCard = ({ post }: SearchResultCardProps) => {
  const {
    title,
    tags,
    createdAt,
    updatedAt,
    documentId,
    slug
  } = post


  const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(createdAt, updatedAt);

  // Truncate title if it's too long (approximately 100 characters)
  const truncatedTitle = title.length > 100 ? `${title.substring(0, 100)}...` : title;

  return (
    <div className="search-result-card">
      {/* Title */}
      <h2 className="search-result-title">{truncatedTitle}</h2>

      {/* Date information */}
      <div className="search-result-date">
        {formattedCreatedAt}
        {showUpdatedDate ? " (Updated: " + formattedUpdatedAt + ")" : ""}
      </div>

      {/* Read more link */}
      <div className="search-result-read-more">
        <Link href={`/posts/${slug}`}>READ MORE</Link>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="search-result-tags">
          <FontAwesomeIcon icon={faTag} />
          <div className="search-result-tags-list">
            {tags.map((tag, index) =>
              tag ? (
                <span key={tag.slug} className="search-result-tag">
                  {tag.name}
                </span>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResultCard
