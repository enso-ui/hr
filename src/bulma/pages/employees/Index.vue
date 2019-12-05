<template>
<enso-table id="employees"
        class="box is-paddingless raises-on-hover is-rounded"
        :path="path"/>
</template>

<script>

import { EnsoTable } from '@enso-ui/bulma';

export default {
    components: { EnsoTable },

    inject: ['route'],

    data() {
        return {
            path: this.route('hr.employees.initTable'),
        };
    },
};

</script>

<style lang="scss">
</style>
