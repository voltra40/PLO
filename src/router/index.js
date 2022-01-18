import { createWebHistory, createRouter } from "vue-router";

import BucketListComponent from '../components/BucketListComponent.vue';
import HomeComponent from '../components/HomeComponent.vue';
import HabitsComponent from '../components/HabitsComponent.vue';


const routes = [
  {
    name: "home",
    path: "/",
    component: HomeComponent,
  },
  {
    name: "bucket",
    path: "/api/bucket-list/",
    component: BucketListComponent,
  },
  {
    name: "habits",
    path: "/api/habits/",
    component: HabitsComponent,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;