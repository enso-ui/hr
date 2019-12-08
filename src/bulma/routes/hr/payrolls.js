import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./payrolls', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: 'payrolls',
    component: RouterView,
    meta: {
        breadcrumb: 'payrolls',
        route: 'hr.payrolls.index',
    },
    children: routes,
};
