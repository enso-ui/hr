const EmployeeCreate = () => import('../../../pages/administration/employees/Create.vue');

export default {
    name: 'administration.employees.create',
    path: 'create',
    component: EmployeeCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Employee',
    },
};
