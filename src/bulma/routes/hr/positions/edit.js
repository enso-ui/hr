const PositionEdit = () => import('../../../pages/positions/Edit.vue');

export default {
    name: 'hr.positions.edit',
    path: ':position/edit',
    component: PositionEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Position',
    },
};
