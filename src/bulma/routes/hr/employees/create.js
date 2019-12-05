const EmployeeCreate = () => import('../../../pages/employees/Create.vue');

export default {
    name: 'hr.employees.create',
    path: 'create',
    component: EmployeeCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Employee',
    },
};
