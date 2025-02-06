"use client"
import { useEffect, useState } from 'react'
import { loadSpace } from '@usersnap/browser'
import type { SpaceApi, InitOptions } from '@usersnap/browser'
import { UsersnapContext } from './UsersnapContext'

const initParams: InitOptions = {
  custom: {
    plan: 'trial',
    testGroup: 'A',
    currency: 'USD',
  },
}

const USERSNAP_SPACE_API_KEY = '<USERSNAP_SPACE_API_KEY>'

export const UsersnapProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [usersnapApi, setUsersnapApi] = useState<SpaceApi | null>(null)

  useEffect(() => {
    loadSpace(USERSNAP_SPACE_API_KEY).then((api) => {
      api.init(initParams)
      setUsersnapApi(api)
    })
  }, [])

  return (
    <UsersnapContext.Provider value={usersnapApi}>
      {children}
    </UsersnapContext.Provider>
  )
}
