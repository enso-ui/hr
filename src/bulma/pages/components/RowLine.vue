<template>
    <tr class="project-line">
        <td class="is-numeric">
            {{ index + 1 }}.
        </td>
        <td class="has-text-centered">
            <div>
                {{ line.project }}
            </div>
        </td>
        <td class="has-text-right">
            <p class="control has-icons-right has-text-right">
                <input v-model.number="line.amount"
                    class="input is-numeric "
                    :class="{'is-danger': hasError}"
                    :placeholder="i18n('amount')"
                    @input="clearErrors();">
            </p>
        </td>
        <td class="has-text-right small">
            <a v-if="balance !== 0"
               class="button is-naked"
               @click="updateBalance">
                <span class="icon is-small danger">
                    <fa icon="balance-scale-right"
                        size="xs"/>
                </span>
            </a>
        </td>
    </tr>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faPercentage, faBalanceScaleRight, faSpinner,
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt, faPercentage, faBalanceScaleRight, faSpinner);

export default {
    inject: [
        'i18n', 'errorHandler', 'route',
    ],

    props: {
        line: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        errors: {
            type: Object,
            required: true,
        },
    },
    computed: {
        hasError() {
            return this.errors.has('amount')
                || this.errors.has(`amount-${this.line.project_id}`);
        },
    },
    methods: {
        updateBalance() {
            this.line.amount -= this.balance;
            this.line.amount = Math.round(this.line.amount * 100) / 100;
            this.clearErrors();
        },
        clearErrors() {
            this.errors.clear('amount');
            this.errors.clear(`amount-${this.line.project_id}`);
        },
    },
};
</script>

<style lang="scss">
    tr.project-line {
        td.is-numeric, .is-numeric {
            font-family: monospace;
            font-size: 1em;
            text-align: right;
        }

        td {
            vertical-align: middle;
            .input {
                width: 10em;
            }
            .small {
                width: 15%;
            }
        }
    }
</style>
