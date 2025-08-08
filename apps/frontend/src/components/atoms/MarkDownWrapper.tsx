import React from 'react'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import CodeBlock from '@/components/molecules/CodeBlock'
import MarkdownLink from '@/components/atoms/MarkdownLink'

type MarkdownProps = {
    children: string
    additionalClassName?: string
    options?: MarkdownToJSX.Options
}

const DEFAULT_OPTIONS: MarkdownToJSX.Options = {
    wrapper: 'div',
    overrides: {
        // You can customize the rendering of specific HTML elements here
        h1: {
            component: ({ children }) => (
                <h1 className="text-2xl lg:text-3xl font-normal mt-10 mb-1 text-primary leading-ex-tight tracking-wide uppercase border-b border-gray pb-2">
                    {children}
                </h1>
            ),
        },
        h2: {
            component: ({ children }) => (
                <h2 className="text-[22px] lg:text-2xl font-normal text-primary mt-10 mb-2 tracking-wide capitalize border-b border-gray pb-2">
                    {children}
                </h2>
            ),
        },
        h3: {
            component: ({ children }) => (
                <h3 className="text-xl lg:text-[22px] font-normal text-primary mt-8 mb-2 tracking-wide capitalize border-b border-gray pb-2">
                    {children}
                </h3>
            ),
        },
        h4: {
            component: ({ children }) => (
                <h4 className="text-xl lg:text-[22px] font-semibold text-primary mt-8 mb-2 tracking-wide capitalize">
                    {children}
                </h4>
            ),
        },
        h5: {
            component: ({ children }) => (
                <h5 className="text-lg lg:text-xl font-bold text-primary mt-6 mb-2 tracking-wider capitalize">
                    {children}
                </h5>
            ),
        },
        h6: {
            component: ({ children }) => (
                <h6 className="text-lg lg:text-xl font-nomal text-primary mt-6 mb-2tracking-wider uppercase">
                    {children}
                </h6>
            ),
        },
        p: {
            component: ({ children }) => (
                <p className="text-base lg:text-lg text-primary font-light leading-normal tracking-wider mb-5">
                    {children}
                </p>
            ),
        },
        ul: {
            component: ({ children }) => <ul className="list-disc ml-5 my-2">{children}</ul>,
        },
        ol: {
            component: ({ children }) => <ol className="list-decimal ml-5 my-2">{children}</ol>,
        },
        li: {
            component: ({ children }) => (
                <li className="my-1 font-light text-primary text-base tracking-wide">{children}</li>
            ),
        },
        a: {
            component: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
        },
        pre: {
            component: ({ children }) => (
                <div>
                    <pre className="text-base lg:text-lg text-primary leading-normal tracking-wide mb-5">
                        {children}
                    </pre>
                </div>
            ),
        },
        code: {
            component: ({ children, className }) => <CodeBlock className={className}>{children}</CodeBlock>,
        },
        blockquote: {
            component: ({ children }) => (
                <div className="p-4 bg-light-gray rounded-r-md border-l-4 border-l-secondary">
                    <blockquote className="italic tracking-widest text-base lg:text-lg">{children}</blockquote>
                </div>
            ),
        },
        img: {
            component: ({ src, alt }) => (
                <span className="w-full block">
                    <img
                        className="w-full h-auto rounded-md my-4 max-w-full"
                        src={src}
                        alt={alt || 'Image'}
                        loading="lazy"
                    />
                </span>
            ),
        },
    },
}

function MarkDownWrapper({ children, options, additionalClassName = '' }: MarkdownProps) {
    options = { ...DEFAULT_OPTIONS, ...options }

    return (
        <div className="markdown-container">
            <Markdown options={options} className={additionalClassName}>
                {children}
            </Markdown>
        </div>
    )
}

export default MarkDownWrapper
