<script>
/**
 * You can define initial values for a few fields in your widget.
 * Important that those fields must exist in your widget.
 * Please note that "rating" field is available only for
 * NPS, CSAT and Customer Engagement
 */
export default {
    inject: ['usersnapApi'],
    methods: {
        /**
         * @param event 
         * @param event.type Type of the event, in this case "load"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         */
        handleWidgetLoad(event) {
            // here the widget or feedback button is loaded
        },

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.api.setValue Function to set the initial values of widget fields
         */
        handleWidgetOpen(event) {
           // here the widget starts opening
        },

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.values Key-value pairs object with feedback item values
         * @param event.api.setValue Function to set the feedback item values before they are being submitted.
         * The allowed values for changing are labels, custom, visitor, assignee
         */
        handleWidgetBeforeSubmit(event) {
            // here the widget feedback item is about to be submitted
        },

        /**
         * @param event 
         * @param event.type Type of the event, in this case "open"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.values Key-value pairs object with feedback item values
         */
        handleWidgetSubmit(event) {
            // here the widget feedback item was submitted
        },

        /**
         * @param event 
         * @param event.type Type of the event, in this case "closing"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
         */
        handleWidgetClosing(event) {
            // here the widget starts closing
        },

        /**
         * @param event 
         * @param event.type Type of the event, in this case "closing"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
         */
        handleWidgetClose(event) {
            // here the widget is closed
        },

        /**
         * @param event 
         * @param event.type Type of the event, in this case "destroy"
         * @param event.apiKey Project API key of the widget for which the event was triggerred
         */
        handleWidgetDestroy(event) {
            // here the widget is destroyed and removed from DOM
        }
    },
    created() {
        const unwatch = this.$watch('usersnapApi', (usersnapApi, oldVal) => {
            if (!oldVal && usersnapApi) {
                usersnapApi.on('load', this.handleWidgetLoad);
                usersnapApi.on('open', this.handleWidgetOpen);
                usersnapApi.on('beforeSubmit', this.handleWidgetBeforeSubmit);
                usersnapApi.on('submit', this.handleWidgetSubmit);
                usersnapApi.on('closing', this.handleWidgetClosing);
                usersnapApi.on('close', this.handleWidgetClose);
                usersnapApi.on('destroy', this.handleWidgetDestroy);
                
                unwatch()
            }
        }, { immediately: true })
    },
    beforeUnmount() {
        if (this.usersnapApi) {
            this.usersnapApi.off('load', this.handleWidgetLoad);
            this.usersnapApi.off('open', this.handleWidgetOpen);
            this.usersnapApi.off('beforeSubmit', this.handleWidgetBeforeSubmit);
            this.usersnapApi.off('submit', this.handleWidgetSubmit);
            this.usersnapApi.off('closing', this.handleWidgetClosing);
            this.usersnapApi.off('close', this.handleWidgetClosing);
            this.usersnapApi.off('destroy', this.handleWidgetDestroy);
        }
    }
}
</script>

<template>
    <div>Widget events</div>
</template>
