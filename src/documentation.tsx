import React, { useMemo } from 'react'
import { MDXProvider } from '@mdx-js/react'
import collectDocsModules from './collect-docs-modules'
import useModule from './use-module'
import styled from 'styled-components'
import WrapperComponent from './wrapper-component'
import CodeComponent from './code-component'
import TableComponent from './table-component'
import TableDataComponent from './table-data-component'
import TableHeadComponent from './table-head-component'

const Page = styled.div`
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%
    overflow: hidden;
`

const SideMenu = styled.div`
    float: left;
    width: 250px;
    max-width: 250px;
    padding: 1em;
    border-right: 1px solid lightgray;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
`

const MenuItem = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    font-weight: ${p => p.selected ? 'bold' : 'normal'};
`

const ContentContainer = styled.div`
    margin-left: 250px;
    height: 100%;
    overflow: auto;
`

const NotSelectedScreen = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    color: grey;
`

const components = {
    wrapper: WrapperComponent,
    code: CodeComponent,
    table: TableComponent,
    th: TableHeadComponent,
    td: TableDataComponent,
}

export default function Documentation(): React.ReactElement {
    const modules = collectDocsModules()
    const [current, setCurrent] = useModule(modules)

    const sorted = useMemo(() => modules.sort((a, b) => (a.name < b.name ? -1 : 1)), [modules])

    return (
        <Page>
            <SideMenu>
                <h2>Library</h2>
                {sorted.map((item) => (
                    <MenuItem
                        key={item.name}
                        title={item.name}
                        onClick={() => setCurrent(item)}
                        selected={item.name === current?.name}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </SideMenu>

            <ContentContainer>
                {current ? (
                    <MDXProvider components={components}>{React.createElement(current.component)}</MDXProvider>
                ) : (
                    <NotSelectedScreen>
                        <p>Click on any module to see its docs</p>
                    </NotSelectedScreen>
                )}
            </ContentContainer>
        </Page>
    )
}
  