import React from 'react'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'

type MarkdownProps = {
    children: string
    additionalClassName?: string
    options?: MarkdownToJSX.Options
}

const DEFAULT_OPTIONS: MarkdownToJSX.Options = {
    wrapper: 'div',
}

function MarkDownWrapper({ children, options = DEFAULT_OPTIONS, additionalClassName = '' }: MarkdownProps) {
    return (
        <div className="markdown-container">
            <Markdown options={options} className={additionalClassName}>
                {children}
            </Markdown>
        </div>
    )
}

export default MarkDownWrapper
