const EmployeeEdit = () => import('../../../pages/administration/employees/Edit.vue');

export default {
    name: 'administration.employees.edit',
    path: ':employee/edit',
    component: EmployeeEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Employee',
    },
};
