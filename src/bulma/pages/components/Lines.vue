<template>
    <div class="wrapper">
        <div>
            <div v-if="! processing || hasLines()" class="table-responsive">
                <table v-if="hasLines()"
                    class="table is-striped is-marginless is-narrow project-table">
                    <header-line v-bind="$attrs"/>
                    <transition-group name="lines" tag="tbody">
                        <tr is="row-line"
                            v-for="(line,index) in lines"
                            :key="line.project_id"
                            class="line"
                            :line="line"
                            :index="index"
                            :balance="balance"
                            :errors="errors"
                            v-on="$listeners"/>
                    </transition-group>
                    <footer-line :balance="balance"
                        :processing="processing"
                        @validate="save"
                        @recalculate="recalculate"
                        @editEmployee="editEmployee"/>
                </table>
                <NoLines v-else
                    :processing="processing"
                    @recalculate="recalculate"
                    @editEmployee="editEmployee"/>
            </div>
            <div v-else class="has-text-centered">
                <span class="icon"><fa icon="spinner" spin/></span>
            </div>
        </div>
    </div>
</template>

<script>
import Errors from '@enso-ui/forms/src/classes/Errors';
import HeaderLine from './HeaderLine.vue';
import RowLine from './RowLine.vue';
import FooterLine from './FooterLine.vue';
import NoLines from './NoLines.vue';

export default {
    name: 'Lines',

    components: {
        HeaderLine, RowLine, FooterLine, NoLines,
    },

    props: {
        id: {
            type: Number,
            required: true,
        },
    },

    data: () => ({
        errors: new Errors(),
        lines: [],
        processing: true,
        payroll: {},
    }),

    inject: ['route', 'errorHandler'],

    computed: {
        balance() {
            const result = this.lines.reduce((sum, project) => sum + project.amount, 0);

            return result - 100;
        },
    },

    created() {
        this.load();
    },

    methods: {
        hasLines() {
            return this.lines.length > 0;
        },
        chainRequest(call) {
            const processing = () => {
                this.processing = true;
                call().then((result) => {
                    this.processing = false;
                    return result;
                }).catch(error => this.handleError(error));
            };

            this.promise = this.promise
                ? this.promise.then(processing)
                : processing();
        },
        save() {
            const call = () => axios.post(this.route('hr.payrolls.projects.store', {
                payroll: this.id,
            }), { projects: this.lines }).then(({ data }) => {
                this.lines = data.payroll.projects;
                this.$toastr.success(data.message);
                this.$emit('validate');
            });

            this.chainRequest(call);
        },
        recalculate() {
            const call = () => axios.get(this.route('hr.payrolls.recalculate', {
                payroll: this.id,
            })).then(({ data }) => {
                this.lines = data.payroll.projects;
                this.payroll = data.payroll;
                this.$emit('recalculate');
            });

            this.chainRequest(call);
        },
        load() {
            const call = () => axios.get(this.route('hr.payrolls.show', {
                payroll: this.id,
            })).then(({ data }) => {
                this.lines = data.projects;
                this.payroll = data;
            });

            this.chainRequest(call);
        },
        editEmployee() {
            this.$router.push({
                name: 'hr.employees.edit',
                params: { employee: this.payroll.employee_id },
            });
        },
        handleError(error) {
            this.processing = false;

            const { status, data } = error.response;
            if (status === 422) {
                this.errors.set(data.errors);
                return;
            }
            this.errorHandler(error);
        },
    },
};
</script>

<style lang="scss">
    .project-table {
        width: 650px;

        th {
            vertical-align: middle;
        }

        .line {
            transition: all 0.5s;
        }

        .lines-move {
            transition: item transform 0.333s;
        }

        .lines-enter, .lines-leave-to {
            opacity: 0;
        }
    }
</style>
