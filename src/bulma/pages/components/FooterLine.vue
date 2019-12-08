<template>
    <tfoot class="project-line">
    <tr class="has-background-light">
        <td class="is-bold has-text-left" colspan="2">
            <a class="button is-warning"
               :class="{'is-loading': processing}"
               @click="$emit('recalculate')">
                {{ i18n('Recalculate') }}<fa icon="sync" class="has-margin-left-small"/>
            </a>
            <a class="button is-info has-margin-left-medium"
               :class="{'is-loading': processing}"
               @click="$emit('editEmployee')">
                {{ i18n('Edit Employee') }} <fa icon="user-tie" class="has-margin-left-small"/>
            </a>
        </td>
        <td class="is-bold has-text-right has-text-danger balance">
            <span v-if="balance !== 0" class="is-bold has-text-right has-text-danger">
                {{ balance }}
            </span>
            <span v-else class="has-text-success">
                {{ i18n('balanced') }} <fa icon="check"/>
            </span>
        </td>
        <td class="is-bold has-text-right">
            <a class="button is-success"
               :class="{'is-loading': processing}"
               @click="$emit('validate')">
                {{ i18n('Valid') }}
            </a>
        </td>
    </tr>
    </tfoot>
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
        balance: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style>
    .balance {
        font-family: monospace;
        font-size: 1.1em;
    }
</style>
