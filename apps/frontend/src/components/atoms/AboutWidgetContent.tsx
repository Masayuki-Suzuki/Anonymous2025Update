import Image from 'next/image'
import Markdown from 'markdown-to-jsx'

interface AboutWidgetContentProps {
    content?: string | null
    profileImage?: {
        alternativeText?: string | null
        url: string
        name: string
        width?: number | null
        height?: number | null
    } | null
}

// Strapi base URL - can be changed when deployed to Google Compute Engine
const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

const AboutWidgetContent = ({ content, profileImage }: AboutWidgetContentProps) => {
    return (
        <div>
            {content && <Markdown>{content}</Markdown>}

            {profileImage && (
                <div>
                    <Image
                        src={`${strapiBaseUrl}${profileImage.url}`}
                        alt={profileImage.alternativeText || profileImage.name || 'Profile image'}
                        width={profileImage.width || 300}
                        height={profileImage.height || 300}
                    />
                </div>
            )}
        </div>
    )
}

export default AboutWidgetContent
