import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/houses', component: () => import('../views/HousesView.vue') },
  { path: '/persons', component: () => import('../views/PersonsView.vue') },
  { path: '/quotes', component: () => import('../views/QuotesView.vue') },
  { path: '/housedetails/:houseId', component: () => import('../views/HouseDetailsView.vue') },
  { path: '/persondetails/:personId', component: () => import('../views/PersonDetailsView.vue') }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
