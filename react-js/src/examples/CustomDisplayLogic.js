import React, { useEffect } from 'react'
import { USERSNAP_PROJECT_API_KEY } from '../constants'
import { useUsersnapApi } from '../UsersnapContext'

/**
 * There a few ways to show your widget with custom button.
 * The first thing you need to do is to make sure in the dashboard
 * configuration of your widget in the "Display" tab you have audience "Nobody".
 * Then you open your feedback button or widget whenever you need.
 */
export default function CustomDisplayLogic({ shouldShow }) {
    const usersnapApi = useUsersnapApi()

    useEffect(() => {
        if (usersnapApi && shouldShow) {
            usersnapApi.show(USERSNAP_PROJECT_API_KEY)
        }
    }, [usersnapApi, shouldShow])

    return (
        <div>Custom logic for displaying the widget or feedback button</div>
    )
}
