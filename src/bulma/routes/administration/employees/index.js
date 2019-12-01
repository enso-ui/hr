const EmployeeIndex = () => import('../../../pages/administration/employees/Index.vue');

export default {
    name: 'administration.employees.index',
    path: '',
    component: EmployeeIndex,
    meta: {
        breadcrumb: 'index',
        title: 'Employees',
    },
};
