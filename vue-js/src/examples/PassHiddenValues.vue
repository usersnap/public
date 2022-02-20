<script>
/**
 * You can define hidden values for some fields which are not
 * visible in your widget.
 */
export default {
    inject: ['usersnapApi'],
    props: {
        labels: {
            type: Array,
            default: ['Bug', 'Urgent'],
        },
        email: {
            type: String,
            default: 'user@mail.com',
        },
        assignee: {
            type: String,
            default: 'assignee@mail.com',
        },
        custom: {
            type: null,
            default: {
                importantData: 'From Super user'
            },
        }
    },
    methods: {
        handleOpenWidget(event) {
            console.log('here')
            event.api.setValue('labels', this.labels);
            event.api.setValue('visitor', this.email);
            event.api.setValue('assignee', this.assignee);
            event.api.setValue('custom', this.custom);
        }
    },
    created() {
        console.log('now')
        const unwatch = this.$watch('usersnapApi', (usersnapApi, oldVal) => {
            console.log('usersnapApi')
            if (!oldVal && usersnapApi) {
                usersnapApi.on('open', this.handleOpenWidget);
                
                unwatch()
            }
        }, { immediately: true })
    },
    beforeUnmount() {
        if (this.usersnapApi) {
            this.usersnapApi.off('open', this.handleOpenWidget)
        }
    }
}
</script>

<template>
    <div>Pass hidden values to widget</div>
</template>
