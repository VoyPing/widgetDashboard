import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import WidgetSettings from '@/views/WidgetSettings.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/widget/:id', name: 'WidgetSettings', component: WidgetSettings, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
