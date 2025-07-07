'use client'

import dynamic from 'next/dynamic'
import { GetOneArticleQuery } from '@/generated/graphql'

// Define the props type for the loader
interface PostLoaderProps {
    initialPostData?: GetOneArticleQuery
    slug: string
}

// Dynamically import the PostDetail component with SSR disabled
const PostDetail = dynamic(() => import('../templates/PostDetail'), { ssr: false })

export default function PostLoader({ initialPostData, slug }: PostLoaderProps) {
    return <PostDetail initialPostData={initialPostData} slug={slug} />
}
