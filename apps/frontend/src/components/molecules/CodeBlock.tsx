import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
    className?: string
    children: string | string[]
}

function CodeBlock({ className, children }: CodeBlockProps) {
    const language = className?.replace('lang-', '') || 'plaintext'

    console.log(language)

    return (
        <SyntaxHighlighter language={language} style={dracula} PreTag="div">
            {children}
        </SyntaxHighlighter>
    )
}

export default CodeBlock
