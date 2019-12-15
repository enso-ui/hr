<template>
    <modal class="generate-modal"
           show
           v-on="$listeners">
        <enso-form class="box has-background-light"
            :path="route('hr.payrolls.generate.create')"
            disable-state
            v-on="$listeners"/>
    </modal>
</template>

<script>
import { EnsoForm, Modal } from '@enso-ui/bulma';

export default {
    name: 'GenerateForm',

    components: {
        Modal, EnsoForm,
    },

    inject: ['route'],
};
</script>

<style lang="scss">
    .modal.generate-modal .modal-content {
        overflow: visible;
        width: 750px;
    }
</style>
