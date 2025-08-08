import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
    className?: string
    children: string | string[]
}

function CodeBlock({ className, children }: CodeBlockProps) {
    const language = className?.replace('lang-', '') || 'plaintext'

    return (
        <SyntaxHighlighter language={language} style={dracula} PreTag="div" className="text-base">
            {children}
        </SyntaxHighlighter>
    )
}

export default CodeBlock
