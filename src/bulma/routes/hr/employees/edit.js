const EmployeeEdit = () => import('../../../pages/employees/Edit.vue');

export default {
    name: 'hr.employees.edit',
    path: ':employee/edit',
    component: EmployeeEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Employee',
    },
};
