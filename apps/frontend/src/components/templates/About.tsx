import { AboutQuery } from '@/generated/graphql'
import { notFound } from 'next/navigation'
import MarkDownWrapper from '@/components/atoms/MarkDownWrapper'

interface AboutProps {
    initialAboutData: AboutQuery | undefined
}

export default function About({ initialAboutData }: AboutProps) {
    const content = initialAboutData?.about?.content || null

    if (!content) {
        notFound()
    }

    return (
        <article className="post-detail mt-10 sm:mt-14 md:mt-10 lg:mt-16 mx-auto md:mx-0 w-full md:w-95pct">
            <h1 className="text-2xl lg:text-3xl font-normal mt-10 mb-1 text-primary leading-ex-tight tracking-wide uppercase border-b border-gray pb-2 mb-6">
                About
            </h1>
            <MarkDownWrapper>{content}</MarkDownWrapper>
        </article>
    )
}
