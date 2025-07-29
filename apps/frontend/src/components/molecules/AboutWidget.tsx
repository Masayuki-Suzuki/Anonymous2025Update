import { getClient } from '@/lib/apolloClient'
import { GetAboutWidgetContentDocument, GetAboutWidgetContentQuery } from '@/generated/graphql'
import AboutWidgetContent from '../atoms/AboutWidgetContent'

// This is a server component by default (no 'use client' directive)
const AboutWidget = async () => {
    // Fetch data using getClient for server-side rendering
    const { data } = await getClient().query<GetAboutWidgetContentQuery>({
        query: GetAboutWidgetContentDocument,
    })

    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">about</h3>
            {data?.aboutWidget ? (
                <AboutWidgetContent content={data.aboutWidget.content} profileImage={data.aboutWidget.profile_image} />
            ) : (
                <p>No about content found</p>
            )}
        </div>
    )
}

export default AboutWidget
