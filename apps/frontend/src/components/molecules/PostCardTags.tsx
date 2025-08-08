import { PostTags } from '@/types/posts'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PostCardTagsProps = {
    tags: PostTags
}

function PostCardTags({ tags }: PostCardTagsProps) {
    return (
        <div className="blog-card-tags border-t border-gray flex items-center leading-0 py-2.5">
            <FontAwesomeIcon icon={faTag} color="#777" />
            <div className="blog-card-tags-list flex items-center flex-wrap text-xs ml-2.5 gap-2.5">
                {tags &&
                    tags.length > 0 &&
                    tags.slice(0, 3).map((tag) =>
                        tag ? (
                            <a
                                key={tag.slug}
                                href={`/posts/tag/${tag.slug}`}
                                className="text-mid-gray hover:text-secondary transition-colors duration-300"
                            >
                                <span className="blog-card-tag uppercase leading-none">{tag.name}</span>
                            </a>
                        ) : null
                    )}
            </div>
        </div>
    )
}

export default PostCardTags
