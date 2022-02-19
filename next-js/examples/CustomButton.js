import React from 'react'
import { USERSNAP_PROJECT_API_EVENT_NAME, USERSNAP_PROJECT_API_KEY } from '../constants'
import { useUsersnapApi } from '../components/UsersnapContext'

/**
 * There a few ways to show your widget with custom button.
 * The first thing you need to do is to make sure in the dashboard
 * configuration of your widget in the "Display" tab you have trigger "Auto Popup".
 * Then select an "API event" as an activation and type the name of this event.
 * Then you can use this event name to show your widget. Please note
 */
export default function CustomButton() {
    const usersnapApi = useUsersnapApi()
    /**
     * This method still takes into account other display rules,
     * like filtering by URL path, email, logged in users and so on.
     * It means that even you call this method but widget shouldn't
     * open - it will not open
     */
    const handleOpenWidgetIfAllowed = () => {
        usersnapApi.logEvent(USERSNAP_PROJECT_API_EVENT_NAME)
    }

    /**
     * This method ignores all the display rules and opens the widget
     * no matter what
     */
    const handleOpenWidgetForce = () => {
        usersnapApi.show(USERSNAP_PROJECT_API_KEY).then((widgetApi) => widgetApi.open());
    }

    return (
        <>
            <div>
                <div>With custom button</div>
                <button onClick={handleOpenWidgetIfAllowed}>I will open the widget if allowed</button>
                <button onClick={handleOpenWidgetForce}>I will open the widget no matter what</button>
            </div>
        </>
    )
}
