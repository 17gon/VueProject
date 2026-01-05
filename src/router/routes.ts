import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/menu",
        name: "menu",
        component: () => import("@/views/MenuView.vue"),
    },
    {
        path: "/recipe/:id",
        name: "recipe",
        component: () => import("@/views/RecipeView.vue")
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