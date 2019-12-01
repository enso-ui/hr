const DepartmentEdit = () => import('../../../pages/administration/departments/Edit.vue');

export default {
    name: 'administration.departments.edit',
    path: ':department/edit',
    component: DepartmentEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Department',
    },
};
