import { createRouter, createWebHashHistory } from 'vue-router';
import { ROUTE_HOME, ROUTE_SIGN_IN } from '../constants';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_HOME,
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: ROUTE_SIGN_IN,
      name: 'sign-in',
      component: () => import('../views/SignInView.vue'),
    },
  ],
});

export default router;
