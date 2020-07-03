<template>
    <modal class="generate-modal"
        v-on="$listeners">
        <enso-form class="box has-background-light"
            :path="route('hr.payrolls.generate.create')"
            disable-state
            v-on="$listeners"/>
    </modal>
</template>

<script>
import { EnsoForm } from '@enso-ui/forms/bulma';
import { Modal } from '@enso-ui/modal/bulma';

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
