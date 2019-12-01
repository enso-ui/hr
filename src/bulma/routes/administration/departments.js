import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./departments', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: 'departments',
    component: RouterView,
    meta: {
        breadcrumb: 'departments',
        route: 'administration.departments.index',
    },
    children: routes,
};
