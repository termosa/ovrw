import React, { useState, useEffect } from 'react'

const pushStateListeners: Array<React.Dispatch<React.SetStateAction<string>>> = []
export default function useHistoryPathname(): [string, (pathname: string) => void] {
  const [value, set] = useState(() => location.pathname)

  useEffect(() => {
    if (typeof window === 'undefined') return

    pushStateListeners.push(set)
    if (pushStateListeners.length > 1) return

    const handler = () => pushStateListeners.forEach((set) => set(location.pathname))

    window.addEventListener('popstate', handler)
    return () => (pushStateListeners.length === 0 ? window.removeEventListener('popstate', handler) : undefined)
  }, [])

  const setPathname = (newPathname: string) => {
    history.pushState({}, '', newPathname)
    set(newPathname)
  }

  return [value, setPathname]
}
