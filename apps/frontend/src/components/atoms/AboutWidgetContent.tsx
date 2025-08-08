import Image from 'next/image'
import MarkDownWrapper from '@/components/atoms/MarkDownWrapper'

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
    console.log(content)
    return (
        <div className="about-widget flex">
            {content && (
                <MarkDownWrapper additionalClassName="pr-[0.75em] text-primary font-light text-sm leading-snug">
                    {content}
                </MarkDownWrapper>
            )}

            {profileImage && (
                <div className="w-[37.5%] max-w-[135px] flex-shrink-0 shrink-0">
                    <Image
                        src={`${strapiBaseUrl}${profileImage.url}`}
                        alt={profileImage.alternativeText || profileImage.name || 'Profile image'}
                        width={profileImage.width || 300}
                        height={profileImage.height || 300}
                        className="w-full aspect-square"
                    />
                </div>
            )}
        </div>
    )
}

export default AboutWidgetContent
