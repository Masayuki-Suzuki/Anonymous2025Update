import { PostThumbnailType } from '@/types/posts'
import Image from 'next/image'

type PostThumbnailProps = {
    thumbnail: PostThumbnailType
}

function PostThumbnail({ thumbnail }: PostThumbnailProps) {
    // Strapi base URL - can be changed when deployed to Google Compute Engine
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

    if (!thumbnail || !thumbnail.url) {
        return <div className="blog-card-thumbnail aspect-[16/10] overflow-hidden"></div>
    }

    return (
        <div className="blog-card-thumbnail aspect-[16/10] overflow-hidden">
            <Image
                src={`${strapiBaseUrl}${thumbnail.url}`}
                alt={thumbnail.alternativeText || ''}
                width={thumbnail.width || 0}
                height={thumbnail.height || 0}
                className="max-w-full mx-auto w-full h-full object-cover object-center"
            />
        </div>
    )
}

export default PostThumbnail
