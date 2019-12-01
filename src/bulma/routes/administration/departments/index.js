const DepartmentIndex = () => import('../../../pages/administration/departments/Index.vue');

export default {
    name: 'administration.departments.index',
    path: '',
    component: DepartmentIndex,
    meta: {
        breadcrumb: 'index',
        title: 'Departments',
    },
};
