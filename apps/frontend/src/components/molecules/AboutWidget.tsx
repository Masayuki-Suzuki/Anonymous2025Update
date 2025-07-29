import { GetAboutWidgetContentDocument, GetAboutWidgetContentQuery } from '@/generated/graphql'
import { fetchData } from '@/lib/dataFetcher'
import ListWrapper from '../atoms/ListWrapper'
import AboutWidgetContent from '../atoms/AboutWidgetContent'
import EmptyState from '../atoms/EmptyState'

// This is a server component by default (no 'use client' directive)
const AboutWidget = async () => {
    // Fetch data using the common data fetcher
    const data = await fetchData<GetAboutWidgetContentQuery>(GetAboutWidgetContentDocument)

    return (
        <ListWrapper title="about">
            {data?.aboutWidget ? (
                <AboutWidgetContent content={data.aboutWidget.content} profileImage={data.aboutWidget.profile_image} />
            ) : (
                <EmptyState message="No about content found" />
            )}
        </ListWrapper>
    )
}

export default AboutWidget
