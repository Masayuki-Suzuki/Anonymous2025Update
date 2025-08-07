import { GetOneArticleQuery } from '@/generated/graphql'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

type PostTagsProps = {
    post: GetOneArticleQuery['posts'][0]
}

function PostTags({ post }: PostTagsProps) {
    return (
        <div className="post-tags flex items-center gap-2.5 leading-none">
            <FontAwesomeIcon icon={faTag} size="sm" />
            <div className="post-tags-list leading-none">
                {post &&
                    post.tags &&
                    post.tags.length > 0 &&
                    post.tags.slice(0, 3).map((tag) =>
                        tag ? (
                            <Link
                                key={tag.slug}
                                href={`/tags/${tag.slug}`}
                                className="post-tag uppercase text-xs tracking-wider leading-none"
                            >
                                {tag.name}
                            </Link>
                        ) : null
                    )}
            </div>
        </div>
    )
}

export default PostTags
