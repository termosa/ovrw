import React from 'react'
import styled from 'styled-components'
import MetaContext, { MDXMeta } from './meta-context'
import WrapperComponentList from './wrapper-component-list'

const Layout = styled.div`
    flex: 1 0 auto;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
`

const Header = styled.header`
    background: whitesmoke;
    padding: .5em 2em 1em;

    h1 {
        margin: 0;
    }

    small {
        color: gray;
    }
`

const Content = styled.div`
    flex: 1 0 auto;
    padding: 1em 1em 2em;
    overflow: auto;
`

export default function WrapperComponent({ children, meta }: { children: React.ReactNode; meta?: MDXMeta }) {
    return (
        <MetaContext.Provider value={meta}>
            <Layout>
                {meta && (
                    <Header>
                        {meta.name && (
                            <h1>{meta.name} {meta.type ? <small>{meta.type}</small> : null}</h1>
                        )}

                        {meta.tags?.reduce<Array<string | React.ReactNode>>(
                            (elements, tag, index) =>
                                elements.concat([
                                    index ? ', ' : '',
                                    <a key={tag} href={`#${tag}`}>{tag}</a>,
                                ]),
                            []
                        )}
                    </Header>
                )}
                <Content>
                    {meta && (
                        <div>
                            {meta.description && <p>{meta.description}</p>}

                            {meta.preview}

                            {meta.lists && (
                                Object.entries(meta.lists).map(([listName, values]) => (
                                    <WrapperComponentList key={listName} name={listName} values={values} />
                                ))
                            )}
                        </div>
                    )}
                    {children}
                </Content>
            </Layout>
        </MetaContext.Provider>
    )
}