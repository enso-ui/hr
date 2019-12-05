import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./hr', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: '/hr',
    component: RouterView,
    meta: {
        breadcrumb: 'hr',
    },
    children: routes,
};
