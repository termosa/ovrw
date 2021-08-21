import React from 'react'

export default function TableDataComponent(props: React.HTMLAttributes<HTMLTableCellElement>) {
    return (
        <th style={{ border: '1px solid black', padding: '.2em .3em' }} {...props} />
    )
}