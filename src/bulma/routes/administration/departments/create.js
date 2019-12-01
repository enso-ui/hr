const DepartmentCreate = () => import('../../../pages/administration/departments/Create.vue');

export default {
    name: 'administration.departments.create',
    path: 'create',
    component: DepartmentCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Department',
    },
};
