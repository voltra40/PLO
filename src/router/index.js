import { createWebHistory, createRouter } from "vue-router";

import BucketListComponent from '../components/BucketListComponent.vue';
import HomeComponent from '../components/HomeComponent.vue';
import HabitsComponent from '../components/HabitsComponent.vue';
import CryptoComponent from '../components/CryptoPriceComponent.vue';

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeComponent,
  },
  {
    name: "bucket",
    path: "/bucket-list/",
    component: BucketListComponent,
  },
  {
    name: "habits",
    path: "/habits/",
    component: HabitsComponent,
  },
  {
    name: "crypto",
    path: "/crypto-prices/",
    component: CryptoComponent,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;