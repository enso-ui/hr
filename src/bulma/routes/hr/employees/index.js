const EmployeeIndex = () => import('../../../pages/employees/Index.vue');

export default {
    name: 'hr.employees.index',
    path: '',
    component: EmployeeIndex,
    meta: {
        breadcrumb: 'index',
        title: 'Employees',
    },
};
