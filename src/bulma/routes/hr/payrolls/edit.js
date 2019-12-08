const PayrollEdit = () => import('../../../pages/payrolls/Edit.vue');

export default {
    name: 'hr.payrolls.edit',
    path: ':payroll/edit',
    component: PayrollEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Payroll',
    },
};
