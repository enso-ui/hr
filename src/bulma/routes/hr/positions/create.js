const PositionCreate = () => import('../../../pages/positions/Create.vue');

export default {
    name: 'hr.positions.create',
    path: 'create',
    component: PositionCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Position',
    },
};
