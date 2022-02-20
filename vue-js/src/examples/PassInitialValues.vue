<script>
/**
 * You can define initial values for a few fields in your widget.
 * Important that those fields must exist in your widget.
 * Please note that "rating" field is available only for
 * NPS, CSAT and Customer Engagement
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
        rating: {
            type: Number,
            default: 5,
        }
    },
    methods: {
        handleOpenWidget(event) {
            event.api.setValue('labels', labels);
            event.api.setValue('visitor', email);
            event.api.setValue('assignee', assignee);
            event.api.setValue('rating', rating);
        }
    },
    created() {
        const unwatch = this.$watch('usersnapApi', (usersnapApi, oldVal) => {
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
    <div>Pass initial values to widget</div>
</template>
