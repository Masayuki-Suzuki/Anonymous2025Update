'use client'

import dynamic from 'next/dynamic'
import { AboutQuery } from '@/generated/graphql'

interface AboutLoaderProps {
    initialAboutData: AboutQuery
}

const About = dynamic(() => import('../templates/About'), { ssr: true })

export default function AboutLoader({ initialAboutData }: AboutLoaderProps) {
    return <About initialAboutData={initialAboutData} />
}
