import React from 'react'
import styled from 'styled-components'
import capitalize from './capitalize'

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    boxSizing: border-box;
`

const TableHead = styled.th`
    border: 1px solid black;
    padding: .2em .3em;
`

const TableData = styled.td`
    border: 1px solid black;
    padding: .2em .3em;
`

export default function WrapperComponentList({ name, values }) {
    return (
        <div>
            <h2>{capitalize(name)}</h2>
            <Table>
                <thead>
                    <tr>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {values.map((value) => (
                    <tr key={value.name || value.description}>
                        <TableData>
                            <code style={{ fontWeight: 'bold' }}>
                                {value.name}
                                {value.required ? '*' : ''}
                            </code>
                        </TableData>
                        <TableData>
                            {value.type && <code>{value.type}</code>}
                        </TableData>
                        <TableData>{value.description}</TableData>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}