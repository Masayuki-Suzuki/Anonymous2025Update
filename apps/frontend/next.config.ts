import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        esmExternals: true,
        serverComponentsExternalPackages: ['@apollo/client'],
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    compiler: {
        styledComponents: true,
    },
    // Configure output for server-side rendering
    output: 'standalone',
}

export default nextConfig
