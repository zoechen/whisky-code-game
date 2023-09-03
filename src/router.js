import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: "/", name: "Game", component: () => import("@/pages/Game.vue")},
  {path: "/rank", name: "Rank", component: () => import("@/pages/Rank.vue")},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router