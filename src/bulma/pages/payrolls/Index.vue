<template>
    <div class="wrapper">
        <div v-if="ready"
             class="columns is-centered is-multiline">
            <div class="column is-4">
                <enso-select-filter v-model="params.employeeIds"
                    multiple
                    class="box raises-on-hover"
                    source="hr.employees.options"
                    :name="i18n('Employee')"/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.payrolls.is_validated"
                    icons
                    :name="i18n('Valid')"/>
            </div>
        </div>
        <enso-table id="payrolls"
            ref="table"
            class="box is-paddingless raises-on-hover is-rounded"
            :path="route('hr.payrolls.initTable')"
            :params="params"
            :filters="filters"
            @generate="show_generate = true"
            @reset="$refs.filterState.reset()">
            <template v-slot:row-actions="{row}">
                <v-popover trigger="click"
                    show="true"
                    :open="payroll_id === row.id"
                    @hide="payroll_id = null"
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

        <filter-state ref="filterState"
            name="payrollFilters"
            :api-version="apiVersion"
            :filters="filters"
            :params="params"
            @ready="ready = true"/>

        <GenerateForm v-if="show_generate"
            @submit="show_generate = false; $refs.table.fetch()"
            @close="show_generate = false"/>
    </div>
</template>

<script>

import {
    EnsoTable, FilterState, EnsoSelectFilter
} from '@enso-ui/bulma';
import { BooleanFilter } from '@enso-ui/filters/bulma';
import { VPopover } from 'v-tooltip';
import { faMoneyCheckEditAlt } from '@fortawesome/pro-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Lines from '../components/Lines.vue';
import GenerateForm from '../components/GenerateForm.vue';

library.add([faMoneyCheckEditAlt]);

export default {
    name: 'PayrollIndex',

    components: {
        EnsoTable, VPopover, Lines, GenerateForm, BooleanFilter, FilterState,
        EnsoSelectFilter,
    },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1.2,
        ready: false,
        payroll_id: null,
        show_generate: false,
        params: {
            employeeIds: [],
        },
        filters: {
            payrolls: {
                is_validated: false,
            },
        },
    }),
};

</script>
