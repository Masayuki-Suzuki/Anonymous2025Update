import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:1337/graphql',
    documents: 'src/graphql/**/*.graphql',
    generates: {
        'src/generated/': {
            // plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                skipTypename: true,
            },
            preset: 'client',
            presetConfig: {
                fragmentMasking: false,
            },
        },
    },
}

export default config
