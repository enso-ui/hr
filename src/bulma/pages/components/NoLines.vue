<template>
    <div class="level">
        <a class="button is-warning level-left"
           :class="{'is-loading': processing}"
           @click="$emit('recalculate')">
            {{ i18n('Recalculate') }}
            <fa icon="sync" class="has-margin-left-small"/>
        </a>
        <a class="button is-info has-margin-left-medium level-right"
           :class="{'is-loading': processing}"
           @click="$emit('editEmployee')">
            {{ i18n('Edit Employee') }}
            <fa icon="user-tie" class="has-margin-left-small"/>
        </a>
    </div>
</template>

<script>
export default {
    inject: ['i18n'],

    props: {
        processing: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
};
</script>
