import { createWebHistory, createRouter } from "vue-router";

import BucketListComponent from '../components/BucketListComponent.vue';
import HomeComponent from '../components/HomeComponent.vue';

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeComponent,
  },
  {
    name: "bucket",
    path: "/api/bucketListItems/",
    component: BucketListComponent,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;