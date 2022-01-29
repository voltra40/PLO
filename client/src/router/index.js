import { createWebHistory, createRouter } from "vue-router";

import BucketListComponent from "../components/BucketListComponent.vue";
import HomeComponent from "../components/HomeComponent.vue";
import HabitsComponent from "../components/HabitsComponent.vue";
import CryptoComponent from "../components/CryptoPriceComponent.vue";
import TransactionHistoryComponent from "../components/TransactionHistoryComponent.vue";
import SleepDataComponent from "../components/SleepDataComponent.vue";
import SleepDataFullComponent from "../components/SleepDataFullComponent.vue";

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
  {
    name: "transactions",
    path: "/transaction-history/",
    component: TransactionHistoryComponent,
  },
  {
    name: "sleep",
    path: "/sleep-data/",
    component: SleepDataComponent,
  },
  {
    name: "sleep data full",
    path: "/sleep-data-full/",
    component: SleepDataFullComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
