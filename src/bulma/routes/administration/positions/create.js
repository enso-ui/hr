const PositionCreate = () => import('../../../pages/administration/positions/Create.vue');

export default {
    name: 'administration.positions.create',
    path: 'create',
    component: PositionCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Position',
    },
};
