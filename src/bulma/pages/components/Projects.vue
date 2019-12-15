<template>
    <lines :id="payroll.id"
        ref="lines"
        type="LaravelEnso\HR\app\Models\Payroll"
        v-on="$listeners"
        @recalculate="recalculate">
        <template v-slot:actions-left="{processing}">
            <a class="button is-info has-margin-left-medium"
               :class="{'is-loading': processing}"
               @click="editEmployee">
                {{ i18n('Edit Employee') }} <fa icon="user-tie" class="has-margin-left-small"/>
            </a>
            <a class="button is-warning has-margin-left-medium"
               :class="{'is-loading': processing}"
               @click="recalculate">
                {{ i18n('Recalculate') }}<fa icon="sync" class="has-margin-left-small"/>
            </a>
        </template>
    </lines>
</template>

<script>

import Lines from '@enso-ui/projects/src/bulma/pages/components/Lines.vue';

export default {
    name: 'Projects',

    components: {
        Lines,
    },

    inject: ['i18n', 'route'],

    props: {
        payroll: {
            type: Object,
            required: true,
        },
    },
    computed: {
        params() {
            return {
                payroll: this.id,
            };
        },
    },
    methods: {
        editEmployee() {
            this.$router.push({
                name: 'hr.employees.edit',
                params: { employee: this.payroll.employee_id },
            });
        },
        recalculate() {
            const call = () => axios.get(this.route('hr.payrolls.recalculate', {
                payroll: this.payroll.id,
            })).then(({ data }) => {
                this.lines = data.payroll.projects;
                this.payroll.is_validated = false;
                this.$refs.lines.load();
                this.$refs.lines.resetErrors();
            });

            this.$refs.lines.chainRequest(call);
        },
    },
};

</script>
