<script>
    import { USERSNAP_PROJECT_API_KEY } from '../constants'

    /**
     * In order to have custom logic to show your widget you need to make sure that
     * in the dashboard configuration of your widget in the "Display" tab you have
     * audience "Nobody". Then you open your feedback button or widget whenever you need.
     */
    export default {
        inject: ['usersnapApi'],
        props: {
            shouldShow: {
                type: Boolean,
                default: true
            }
        },
        created() {
            const unwatch = this.$watch('usersnapApi', (usersnapApi, oldVal) => {
                if (!oldVal && usersnapApi && this.shouldShow) {
                    usersnapApi.show(USERSNAP_PROJECT_API_KEY)
                    unwatch()
                }
            }, { immediately: true })
        }
    }
</script>

<template>
    <div>Custom logic for displaying the widget or feedback button</div>
</template>
