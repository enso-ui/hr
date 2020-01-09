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
                <boolean-filter v-model="params.is_split"
                    class="box raises-on-hover"
                    icons
                    :name="i18n('Splited')"/>
            </div>
        </div>
        <enso-table id="payrolls"
            ref="table"
            class="box is-paddingless raises-on-hover is-rounded"
            :path="route('hr.payrolls.initTable')"
            :params="params"
            @generate="show_generate = true"
            @reset="$refs.filterState.reset()">
            <template v-slot:global-split>
                <v-popover trigger="click"
                    placement="top"
                    ref="popover">
                    <a v-if="hasSelected"
                       class="button has-margin-left-small has-background-info has-text-white">
                        <span class="is-hidden-mobile">
                            {{ i18n('Splits') }}
                        </span>
                        <span class="icon is-small">
                            <fa icon="code-branch"/>
                        </span>
                        <span class="is-hidden-mobile"/>
                    </a>
                    <template v-slot:popover>
                        <splits :ids="selected"
                            type="LaravelEnso\Hr\App\Models\Payroll"
                            @save="$refs.popover.hide(); $refs.table.fetch()"
                            v-if="$refs.popover && $refs.popover.isOpen"/>
                    </template>
                </v-popover>
            </template>

            <template v-slot:row-split="{row}">
                <v-popover trigger="click"
                    placement="top"
                    :ref="`popover-${row.id}`">
                    <a class="button is-small is-table-button is-row-button">
                    <span class="icon is-small">
                        <fa icon="code-branch" size="sm"/>
                    </span>
                    </a>
                    <template v-slot:popover>
                        <div style="min-height: 35px; min-width: 350px;">
                            <splits :id="row.id"
                                ref="lines"
                                type="LaravelEnso\Hr\App\Models\Payroll"
                                @save="$refs[`popover-${row.id}`].hide(); $refs.table.fetch()"
                                v-if="($refs[`popover-${row.id}`] || {}).isOpen">
                                <template v-slot:actions-left="{processing}">
                                    <a class="button is-info has-margin-left-medium"
                                       :class="{'is-loading': processing}"
                                       @click="$router.push({
                                           name: 'hr.employees.edit',
                                           params: { employee: row.employee_id },
                                       })">
                                       {{ i18n('Edit Employee') }}
                                       <fa icon="user-tie" class="has-margin-left-small"/>
                                    </a>
                                </template>
                            </splits>
                        </div>
                    </template>
                </v-popover>
            </template>
        </enso-table>

        <filter-state ref="filterState"
            name="payrollFilters"
            :api-version="apiVersion"
            :params="params"
            @ready="ready = true"/>

        <generate-form v-if="show_generate"
            @submit="show_generate = false; $refs.table.fetch()"
            @close="show_generate = false"/>
    </div>
</template>

<script>

import { EnsoSelectFilter, EnsoTable, FilterState } from '@enso-ui/bulma';
import { BooleanFilter } from '@enso-ui/filters/bulma';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Splits from '@enso-ui/projects/src/bulma/pages/components/Splits.vue';
import { VPopover } from 'v-tooltip';
import GenerateForm from '../components/GenerateForm.vue';

library.add([faCodeBranch]);

export default {
    name: 'PayrollIndex',

    components: {
        EnsoTable,
        VPopover,
        GenerateForm,
        BooleanFilter,
        FilterState,
        EnsoSelectFilter,
        Splits,
    },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1.2,
        ready: false,
        payrollId: null,
        show_generate: false,
        params: {
            employeeIds: [],
            is_split: undefined,
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
