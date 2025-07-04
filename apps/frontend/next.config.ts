import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
    extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        esmExternals: true,
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    serverExternalPackages: ['@apollo/client'],
    compiler: {
        styledComponents: true,
    },
    // Configure output for server-side rendering
    output: 'standalone',
    // Configure domains for next/image
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        return [
            {
                source: '/.well-known/appspecific/com.chrome.devtools.json',
                destination: '/api/empty-devtools',
            },
        ]
    },
}

export default withMDX(nextConfig)
