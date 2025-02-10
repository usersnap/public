import { useEffect } from 'react'
import { useUsersnapApi } from '../useUsersnapApi'
import type { SpaceOpenEventCallback } from '@usersnap/browser'

/**
 * You can define hidden values for some fields which are not
 * visible in your widget.
 */
export default function PassHiddenValues({
  labels = ['Bug', 'Urgent'],
  email = 'user@mail.com',
  assignee = 'assignee@mail.com',
  custom = {
    importantData: 'From Super user',
  },
}) {
  const usersnapApi = useUsersnapApi()

  useEffect(() => {
    if (!usersnapApi) {
      return
    }

    const handleOpenWidget: SpaceOpenEventCallback = (event) => {
      event.api.setValue('labels', labels)
      event.api.setValue('visitor', email)
      event.api.setValue('assignee', assignee)
      event.api.setValue('custom', custom)
    }
    usersnapApi.on('open', handleOpenWidget)

    return () => usersnapApi.off('open', handleOpenWidget)
  }, [usersnapApi, labels, email, assignee, custom])

  return <div>Pass initial values to widget</div>
}
