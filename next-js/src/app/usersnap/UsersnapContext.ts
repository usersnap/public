"use client"
import React from 'react'
import type { SpaceApi } from '@usersnap/browser'

export const UsersnapContext = React.createContext<SpaceApi | null>(null)
