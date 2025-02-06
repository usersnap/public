"use client"
import { loadSpace } from '@usersnap/browser'
import { useEffect } from 'react'

// Replace with the API key from your widget installation page
const USERSNAP_SPACE_API_KEY = '<USERSNAP_SPACE_API_KEY>'


export default function Usersnap() {
  useEffect(() => {
    loadSpace(USERSNAP_SPACE_API_KEY).then((api) => {
      api.init()
    })
  }, []);
  return null
}
