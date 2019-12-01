const PositionEdit = () => import('../../../pages/administration/positions/Edit.vue');

export default {
    name: 'administration.positions.edit',
    path: ':position/edit',
    component: PositionEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Position',
    },
};
