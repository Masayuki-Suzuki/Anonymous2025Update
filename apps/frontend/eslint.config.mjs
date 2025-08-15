import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            'coverage',
            'public',
            '.next',
            '.turbo',
            'out',
            'storybook-static',
            'playwright-report',
            'cypress/videos',
            'cypress/screenshots',
            'src/generated/**',
            'src/graphql/**',
            'src/lib/_ga.ts',
            'src/components/molecules/ConsentBanner.tsx',
            'src/components/molecules/GAListener.tsx',
        ],
    },
]

export default eslintConfig
