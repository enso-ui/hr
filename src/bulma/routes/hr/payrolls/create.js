const PayrollCreate = () => import('../../../pages/payrolls/Create.vue');

export default {
    name: 'hr.payrolls.create',
    path: 'create',
    component: PayrollCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Payroll',
    },
};
