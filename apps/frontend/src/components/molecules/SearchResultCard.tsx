import { SearchPostsQuery } from '@/generated/graphql'
import Link from 'next/link'
import { getFormattedDates } from '@/lib/dateUtils'
import PostCardTags from '@/components/molecules/PostCardTags'

type SearchResultCardProps = {
    post: NonNullable<SearchPostsQuery['posts'][number]>
}

const SearchResultCard = ({ post }: SearchResultCardProps) => {
    const { title, tags, createdAt, updatedAt, slug, excerpt } = post

    const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(createdAt, updatedAt)

    // Truncate title if it's too long (approximately 100 characters)
    const truncatedTitle = title.length > 100 ? `${title.substring(0, 100)}...` : title

    // Truncate excerpt if it's too long (approximately 300 characters)
    // Handle case where excerpt might be undefined in SearchPostsQuery
    const truncatedExcerpt = excerpt && excerpt.length > 300 ? `${excerpt.substring(0, 300)}...` : excerpt

    return (
        <div className="search-result-card">
            {/* Title */}
            <h2 className="blog-card-title text-2xl font-semibold leading-[1.2] mt-6 text-primary">
                <Link href={`/posts/${slug}`} className="hover:text-secondary transition-colors duration-300">
                    {truncatedTitle}
                </Link>
            </h2>

            {/* Date information */}
            <div className="search-result-date uppercase text-mid-gray text-sm mt-1">
                {formattedCreatedAt}
                {showUpdatedDate ? ' (Updated: ' + formattedUpdatedAt + ')' : ''}
            </div>

            {truncatedExcerpt && (
                <div className="blog-card-excerpt text-base tracking-wide mt-4">
                    <p className="text-primary">{truncatedExcerpt}</p>
                </div>
            )}

            {/* Read more link */}
            <div className="blog-card-read-more pt-1 pb-3">
                <Link
                    href={`/posts/${slug}`}
                    className="text-primary font-semibold hover:text-secondary transition-colors duration-300 uppercase"
                >
                    read more
                </Link>
            </div>

            {/* Tags */}
            <PostCardTags tags={tags} border={true} />
        </div>
    )
}

export default SearchResultCard
