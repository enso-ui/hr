<template>
    <div class="wrapper">
        <enso-table id="payrolls"
            ref="table"
            class="box is-paddingless raises-on-hover is-rounded"
            :path="route('hr.payrolls.initTable')"
            @generate="show_generate = true">
            <template v-slot:row-actions="{row}">
                <v-popover trigger="click"
                    show="true"
                    :open="payroll_id === row.id"
                    placement="top">
                    <span class="icon is-small is-naked has-margin-left-medium"
                        @click="payroll_id = row.id">
                        <fa icon="money-check-edit-alt" size="sm"/>
                    </span>
                    <template v-slot:popover
                        :v-close-popover="payroll_id === null">
                        <div class="info">
                            <Lines v-if="payroll_id === row.id"
                                :id="row.id"
                                @validate="row.is_validated = true; payroll_id = null"
                                @recalculate="row.is_validated = false;"/>
                        </div>
                    </template>
                </v-popover>
            </template>
        </enso-table>
        <GenerateForm v-if="show_generate"
            @submit="show_generate = false; $refs.table.fetch()"
            @close="show_generate = false"/>
    </div>
</template>

<script>

import { EnsoTable } from '@enso-ui/bulma';
import { VPopover } from 'v-tooltip';
import { faMoneyCheckEditAlt } from '@fortawesome/pro-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Lines from '../components/Lines.vue';
import GenerateForm from '../components/GenerateForm.vue';

library.add([faMoneyCheckEditAlt]);

export default {
    name: 'PayrollIndex',

    components: {
        EnsoTable, VPopover, Lines, GenerateForm,
    },

    inject: ['route'],

    data: () => ({
        payroll_id: null,
        show_generate: false,
    }),
};

</script>
