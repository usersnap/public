import { useEffect } from 'react'
import { useUsersnapApi } from '../UsersnapContext'

/**
 * You can define initial values for a few fields in your widget.
 * Important that those fields must exist in your widget.
 * Please note that "rating" field is available only for
 * NPS, CSAT and Customer Engagement
 */
export default function WidgetApiEvents() {
    const usersnapApi = useUsersnapApi()

    useEffect(() => {
        if (!usersnapApi) {
            return
        }

        /**
         * @param event 
         * @param event.type Type of the event, in this case "load"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         */
        const handleWidgetLoad = (event) => {
            // here the widget or feedback button is loaded
        }
        usersnapApi.on('load', handleWidgetLoad);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.api.setValue Function to set the initial values of widget fields
         */
        const handleWidgetOpen = (event) => {
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
        const handleWidgetBeforeSubmit = (event) => {
            // here the widget feedback item is about to be submitted
        }
        usersnapApi.on('beforeSubmit', handleWidgetBeforeSubmit);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.values Key-value pairs object with feedback item values
         */
        const handleWidgetSubmit = (event) => {
            // here the widget feedback item was submitted
        }
        usersnapApi.on('submit', handleWidgetSubmit);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "closing"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
         */
         const handleWidgetClosing = (event) => {
            // here the widget starts closing
        }
        usersnapApi.on('closing', handleWidgetClosing);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "closing"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
         */
         const handleWidgetClose = (event) => {
            // here the widget is closed
        }
        usersnapApi.on('close', handleWidgetClose);

        /**
         * @param event 
         * @param event.type Type of the event, in this case "destroy"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         */
         const handleWidgetDestroy = (event) => {
            // here the widget is destroyed and removed from DOM
        }
        usersnapApi.on('destroy', handleWidgetDestroy);

        return () => {
            usersnapApi.off('load', handleWidgetLoad);
            usersnapApi.off('open', handleWidgetOpen);
            usersnapApi.off('beforeSubmit', handleWidgetBeforeSubmit);
            usersnapApi.off('submit', handleWidgetSubmit);
            usersnapApi.off('closing', handleWidgetClosing);
            usersnapApi.off('close', handleWidgetClosing);
            usersnapApi.off('destroy', handleWidgetDestroy);
        }
    }, [usersnapApi])

    return <div>Widget events</div>
}
