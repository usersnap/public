import { useEffect } from 'react'
import { useUsersnapApi } from '../useUsersnapApi'
import type { SpaceOpenEventCallback } from '../../../../usersnap/dist/types'

/**
 * You can define initial values for a few fields in your widget.
 * Important that those fields must exist in your widget.
 * Please note that "rating" field is available only for
 * NPS, CSAT and Customer Engagement
 */
export default function PassInitialValues({
  labels = ['Bug'],
  email = 'user@mail.com',
  assignee = 'assignee@mail.com',
  rating = 5,
}) {
  const usersnapApi = useUsersnapApi()

  useEffect(() => {
    if (!usersnapApi) {
      return
    }

    const handleOpenWidget: SpaceOpenEventCallback = (event) => {
      console.log(event.api)
      event.api.setValue('labels', labels)
      event.api.setValue('visitor', email)
      event.api.setValue('assignee', assignee)
      event.api.setValue('rating', rating.toString())
    }
    usersnapApi.on('open', handleOpenWidget)

    return () => usersnapApi.off('open', handleOpenWidget)
  }, [usersnapApi, labels, email, assignee, rating])

}
