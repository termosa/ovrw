import React from 'react'

export type MDXMeta = {
    name?: string
    type?: 'variable' | 'function' | 'component' | 'hook' | string
    description?: string
    tags?: string[]
    scope?: Record<string, React.FC>
    preview?: React.ReactNode
    lists?: {
        [name: string]: Array<{
            name?: string
            type?: string
            description?: string | React.ReactNode
            required?: boolean
        }>
    }
}

const MetaContext = React.createContext<MDXMeta | undefined>({})

export default MetaContext
