import { DocModule } from "./collect-docs-modules";

export default function filterModules(modules: Array<DocModule>, query: string) {
    if (!query) return modules
    const fuzzyQuery = query.split('').map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*')
    return modules.filter(m => m.name.match(new RegExp(fuzzyQuery, 'i')))
}