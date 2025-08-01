import { getClient } from '@/lib/apolloClient'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import BlogList from '@/components/molecules/BlogList'
// import ServerBlogCard from '@/components/molecules/ServerBlogCard'
// import ClientPagination from '@/components/molecules/ClientPagination'

export default async function Home({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
    const params = await searchParams
    const page = params.p ? parseInt(params.p, 10) : 1

    // Fetch data on the server
    const { data } = await getClient().query<PostsQuery>({
        query: PostsDocument,
        variables: { pagination: { page, pageSize: 2 } },
    })

    return <BlogList initialPostData={data} />

    // Render blog cards directly in the server component
    // return (
    // <>
    //     <div className="flex flex-wrap w-full lg:gap-[5%]">
    //         {data.posts.map((post) => post && <ServerBlogCard key={post.documentId} post={post} />)}
    //     </div>
    //
    //     {/* Client component only for pagination */}
    //     {pageInfo && <ClientPagination currentPage={page} totalPages={totalPages} />}
    // </>
    // )
}
