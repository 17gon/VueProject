import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/component",
        name: "header",
        component: () => import("@/components/Header.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
        meta: {
            layout: "default",
            title: "Home",
        },
    },
    {
        path: "/search",
        name: "search",
        component: () => import("@/views/SearchBarView.vue"),
        meta: {
            layout: "default",
            title: "Search recipes",
        },
    },
];