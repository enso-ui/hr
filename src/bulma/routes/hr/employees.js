import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./employees', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: 'employees',
    component: RouterView,
    meta: {
        breadcrumb: 'employees',
        route: 'hr.employees.index',
    },
    children: routes,
};
