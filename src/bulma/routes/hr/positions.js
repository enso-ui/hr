import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./positions', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: 'positions',
    component: RouterView,
    meta: {
        breadcrumb: 'positions',
        route: 'hr.positions.index',
    },
    children: routes,
};
