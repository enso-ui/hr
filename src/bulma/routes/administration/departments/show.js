const DepartmentShow = () => import('../../../pages/administration/departments/Show.vue');

export default {
    name: 'administration.departments.show',
    path: ':department',
    component: DepartmentShow,
    meta: {
        breadcrumb: 'show',
        title: 'Show Department',
    },
};
