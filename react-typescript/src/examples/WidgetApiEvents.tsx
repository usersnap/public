import { useEffect } from 'react'
import { useUsersnapApi } from '../UsersnapContext'

export default function WidgetApiEvents() {
    const usersnapApi = useUsersnapApi()

    useEffect(() => {
        if (!usersnapApi) {
            return
        }

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.api.setValue Function to set the initial values of widget fields
         */
        const handleWidgetOpen = (event: any) => {
           // here the widget starts opening
        }
        usersnapApi.on('open', handleWidgetOpen);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.values Key-value pairs object with feedback item values
         * @param event.api.setValue Function to set the feedback item values before they are being submitted.
         * The allowed values for changing are labels, custom, visitor, assignee
         */
        const handleWidgetBeforeSubmit = (event: any) => {
            // here the widget feedback item is about to be submitted
        }
        usersnapApi.on('beforeSubmit', handleWidgetBeforeSubmit);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.values Key-value pairs object with feedback item values
         */
        const handleWidgetSubmit = (event: any) => {
            // here the widget feedback item was submitted
        }
        usersnapApi.on('submit', handleWidgetSubmit);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "closing"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
         */
         const handleWidgetClose = (event: any) => {
            // here the widget is closed
        }
        usersnapApi.on('close', handleWidgetClose);

        return () => {
            usersnapApi.off('open');
            usersnapApi.off('beforeSubmit');
            usersnapApi.off('submit');
            usersnapApi.off('close');
        }
    }, [usersnapApi])

    return <div>Widget events</div>
}
