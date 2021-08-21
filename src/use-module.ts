import React, { useMemo } from 'react'
import useHistoryPathname from './use-history-pathname'

type Module = {
    name: string
    component: React.FC
  }
  
export default function useModule(modules: Array<Module>): [Module | undefined, (module: Module) => void] {
    const [pathname, setPathname] = useHistoryPathname()

    const module = useMemo(() => {
        const selected = pathname.split('/')[1]
        return modules.find((m) => m.name === selected)
    }, [pathname])
  
    const setModule = (module: Module) => setPathname(`/${module.name}`)
  
    return [module, setModule]
}
