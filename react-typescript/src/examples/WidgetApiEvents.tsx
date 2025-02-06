import { useEffect } from 'react'
import { useUsersnapApi } from '../useUsersnapApi'
import type { SpaceBeforeSubmitEventCallback, SpaceCloseEventCallback, SpaceOpenEventCallback, SpaceSubmitEventCallback } from '../../../../usersnap/dist/types'

export default function WidgetApiEvents() {
  const usersnapApi = useUsersnapApi()

  useEffect(() => {
    if (!usersnapApi) {
      return
    }

    const handleWidgetOpen: SpaceOpenEventCallback = (event) => {
      // here the widget starts opening
      console.log(event)
    }
    usersnapApi.on('open', handleWidgetOpen)

    const handleWidgetBeforeSubmit: SpaceBeforeSubmitEventCallback = (event) => {
      console.log(event)
    }
    usersnapApi.on('beforeSubmit', handleWidgetBeforeSubmit)

    const handleWidgetSubmit : SpaceSubmitEventCallback= (event) => {
      // here the widget feedback item was submitted
      console.log(event)
    }
    usersnapApi.on('submit', handleWidgetSubmit)

    const handleWidgetClose: SpaceCloseEventCallback = (event) => {
      // here the widget is closed
       console.log(event)
    }
    usersnapApi.on('close', handleWidgetClose)

    return () => {
      usersnapApi.off('open', handleWidgetOpen)
      usersnapApi.off('beforeSubmit', handleWidgetBeforeSubmit)
      usersnapApi.off('submit', handleWidgetSubmit)
      usersnapApi.off('close', handleWidgetClose)
    }
  }, [usersnapApi])

  return <div>Widget events</div>
}
