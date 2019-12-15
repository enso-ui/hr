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
                <boolean-filter v-model="filters.payrolls.is_validated"
                    class="box raises-on-hover"
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
            <template v-slot:global-actions>
                <popover trigger="click"
                    placement="top">
                    <template v-slot:target>
                        <a v-if="hasSelected"
                           class="button has-margin-left-small has-background-info has-text-white">
                        <span class="is-hidden-mobile">
                            {{ i18n('Projects') }}
                        </span>
                            <span class="icon is-small">
                            <fa icon="code-branch"/>
                        </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </template>
                    <template v-slot:component="{hide}">
                        <lines :ids="selected"
                            type="LaravelEnso\HR\app\Models\Payroll"
                            @save="hide()"/>
                    </template>
                </popover>
            </template>

            <template v-slot:row-actions="{row}">
                <popover trigger="click"
                    placement="top">
                    <template v-slot:target>
                        <span class="icon is-small is-naked has-margin-left-medium">
                            <fa icon="money-check-edit-alt" size="sm"/>
                        </span>
                    </template>
                    <template v-slot:component="{hide}">
                        <projects :payroll="row"
                            @save="row.is_validated = true; hide()"/>
                    </template>
                </popover>
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

import { EnsoSelectFilter, EnsoTable, FilterState } from '@enso-ui/bulma';
import { BooleanFilter } from '@enso-ui/filters/bulma';
import Popover from '@enso-ui/projects/src/bulma/pages/components/Popover.vue';
import { faMoneyCheckEditAlt } from '@fortawesome/pro-solid-svg-icons';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Lines from '@enso-ui/projects/src/bulma/pages/components/Lines.vue';
import Projects from '../components/Projects.vue';
import GenerateForm from '../components/GenerateForm.vue';

library.add([faMoneyCheckEditAlt, faCodeBranch]);

export default {
    name: 'PayrollIndex',

    components: {
        EnsoTable,
        Popover,
        Projects,
        GenerateForm,
        BooleanFilter,
        FilterState,
        EnsoSelectFilter,
        Lines,
    },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1.2,
        ready: false,
        payrollId: null,
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

    computed: {
        selected() {
            return this.ready
                ? this.$refs.table.$refs.table.$refs.table.state.selected
                : [];
        },
        hasSelected() {
            return this.selected.length > 0;
        },
    },
};

</script>

<style>
    .v-popover{
        display: inline-block !important;
    }
</style>
