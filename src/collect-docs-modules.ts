import React from 'react'
import sourceItems from '../**/*.mdx'

interface JSONType<NodeType = null | number | string> {
  [key: string]: NodeType | JSONType | Array<JSONType>
}

type ESModule = { __esModule: boolean; default: React.FC }

type ModulesMap = JSONType<ESModule>

export type DocModule = {
  name: string
  component: React.FC
}

export default function collectDocsModules(modulesTree: ModulesMap = sourceItems): Array<DocModule> {
    return Object.keys(modulesTree).reduce<Array<DocModule>>((docs, key) => {
        if (!(modulesTree[key] instanceof Object)) return docs
        if (!modulesTree[key].__esModule) return docs.concat(collectDocsModules(modulesTree[key]))
        return docs.concat({
            name: modulesTree[key].name || key.endsWith('.docs') ? key.slice(0, -5) : key,
            component: modulesTree[key].default,
        })
    }, [])
}
