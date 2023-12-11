import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },

    //後台 人員管理
    {
      path: "/BackstagePM",
      name: "BackstagePM",
      component: () => import("../components/CMS/BackstagePM.vue"),
    },

    //後台 課程管理
    {
      path: "/BackstageCM",
      name: "BackstageCM",
      component: () => import("../components/CMS/BackstageCM.vue"),
    },

    //後台 學習進度管理
    {
      path: "/BackstageSP",
      name: "BackstageSP",
      component: () => import("../components/CMS/BackstageSP.vue"),
    },
  ],
});

export default router;
