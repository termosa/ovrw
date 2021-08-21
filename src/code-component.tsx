import React, { useContext } from 'react'
import styled from 'styled-components'
import MetaContext from './meta-context'
import { mdx } from '@mdx-js/react'
import Highlight, { defaultProps as highlightProperties, Language } from 'prism-react-renderer'
import highlightTheme from 'prism-react-renderer/themes/vsLight'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const CodeWrapper = styled.pre`
    background: ghostwhite;
    padding: 10px;
`

export default function CodeComponent({
    live,
    render,
    className,
    children,
    style,
    ...props
}: React.HTMLAttributes<HTMLPreElement> & { live?: boolean; render?: boolean; children: string }) {
    const meta = useContext(MetaContext)
    const language = (className?.match(/language-([^\s]+)/)?.[1] as Language) || 'jsx'

    if (live) {
        return (
            <LiveProvider
                code={children.trim()}
                transformCode={(code) => '/** @jsx mdx */\n' + code}
                scope={{ ...(meta && meta.scope), mdx }}
                noInline={render}
                theme={highlightTheme}
            >
                <LiveEditor />
                    <LivePreview style={{ whiteSpace: 'break-spaces' }} />
                <LiveError />
            </LiveProvider>
        )
    }

    return (
        <Highlight {...highlightProperties} theme={highlightTheme} code={children.trim()} language={language}>
            {({ className, style: highlightStyle, tokens, getLineProps, getTokenProps }) => (
                <CodeWrapper className={className} style={{ ...style, ...highlightStyle }} {...props}>
                    {tokens.map((line, index) => (
                    <div key={index} {...getLineProps({ line, key: index })}>
                        {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                    ))}
                </CodeWrapper>
            )}
        </Highlight>
    )
}
