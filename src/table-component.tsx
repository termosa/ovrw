import React from 'react'

export default function TableComponent(props: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxSizing: 'border-box' }} {...props} />
    )
}